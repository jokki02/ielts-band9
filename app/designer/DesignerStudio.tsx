"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  ArrowDownToLine,
  BedDouble,
  Bot,
  Box,
  Check,
  DoorOpen,
  Download,
  Eraser,
  Eye,
  Grid3X3,
  Home,
  LampFloor,
  Layers3,
  Move,
  Plus,
  RotateCw,
  Ruler,
  Save,
  Sofa,
  Sparkles,
  SplitSquareHorizontal,
  Trash2,
  Upload,
} from "lucide-react";
import { ChangeEvent, PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "local-3d-house-designer-v1";
const SCALE = 42;
const WALL_THICKNESS = 0.16;

type Material = "oak" | "walnut" | "marble" | "concrete" | "linen" | "slate" | "sage";
type FurnitureCategory = "living" | "bedroom" | "kitchen" | "bath" | "openings" | "decor";
type FurnitureKind = "sofa" | "bed" | "table" | "storage" | "plant" | "fixture" | "door" | "window";
type Selection = { type: "room"; id: string } | { type: "object"; id: string } | null;

type Room = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  floorMaterial: Material;
  wallColor: string;
  floorColor: string;
};

type FurnitureObject = {
  id: string;
  name: string;
  roomId: string;
  category: FurnitureCategory;
  kind: FurnitureKind;
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  rotation: number;
  color: string;
  locked: boolean;
};

type DesignProject = {
  version: 1;
  name: string;
  unit: "m";
  rooms: Room[];
  objects: FurnitureObject[];
  lastSavedAt: string;
};

type CatalogItem = {
  name: string;
  category: FurnitureCategory;
  kind: FurnitureKind;
  width: number;
  depth: number;
  height: number;
  color: string;
};

type AiSuggestion = {
  title: string;
  details: string;
};

type AiResponse = {
  summary: string;
  suggestions: AiSuggestion[];
  palette: string[];
  checklist: string[];
  provider: string;
};

type DragState = {
  objectId: string;
  offsetX: number;
  offsetY: number;
};

const MATERIALS: Record<Material, { label: string; color: string }> = {
  oak: { label: "Warm oak", color: "#c89155" },
  walnut: { label: "Dark walnut", color: "#6f432b" },
  marble: { label: "Soft marble", color: "#e8e4dc" },
  concrete: { label: "Polished concrete", color: "#9ca3af" },
  linen: { label: "Linen carpet", color: "#d8c9ad" },
  slate: { label: "Charcoal slate", color: "#334155" },
  sage: { label: "Sage tile", color: "#91a88f" },
};

const CATALOG: CatalogItem[] = [
  { name: "Modular sofa", category: "living", kind: "sofa", width: 2.6, depth: 0.95, height: 0.85, color: "#64748b" },
  { name: "Lounge chair", category: "living", kind: "sofa", width: 0.9, depth: 0.9, height: 0.85, color: "#8b5cf6" },
  { name: "Coffee table", category: "living", kind: "table", width: 1.2, depth: 0.65, height: 0.38, color: "#b45309" },
  { name: "Media console", category: "living", kind: "storage", width: 1.8, depth: 0.45, height: 0.55, color: "#475569" },
  { name: "Queen bed", category: "bedroom", kind: "bed", width: 1.6, depth: 2.1, height: 0.6, color: "#1d4ed8" },
  { name: "Wardrobe", category: "bedroom", kind: "storage", width: 1.8, depth: 0.6, height: 2.2, color: "#78350f" },
  { name: "Night stand", category: "bedroom", kind: "table", width: 0.48, depth: 0.42, height: 0.5, color: "#a16207" },
  { name: "Kitchen island", category: "kitchen", kind: "fixture", width: 2.2, depth: 0.9, height: 0.92, color: "#f8fafc" },
  { name: "Dining table", category: "kitchen", kind: "table", width: 1.8, depth: 0.9, height: 0.75, color: "#92400e" },
  { name: "Fridge", category: "kitchen", kind: "fixture", width: 0.8, depth: 0.7, height: 1.9, color: "#e2e8f0" },
  { name: "Shower", category: "bath", kind: "fixture", width: 0.95, depth: 0.95, height: 2.05, color: "#38bdf8" },
  { name: "Vanity", category: "bath", kind: "fixture", width: 0.9, depth: 0.52, height: 0.86, color: "#f1f5f9" },
  { name: "Door swing", category: "openings", kind: "door", width: 0.9, depth: 0.12, height: 2.05, color: "#f59e0b" },
  { name: "Window", category: "openings", kind: "window", width: 1.4, depth: 0.1, height: 1.2, color: "#7dd3fc" },
  { name: "Floor lamp", category: "decor", kind: "plant", width: 0.38, depth: 0.38, height: 1.7, color: "#fde68a" },
  { name: "Indoor plant", category: "decor", kind: "plant", width: 0.55, depth: 0.55, height: 1.2, color: "#22c55e" },
];

const SAMPLE_PROJECT: DesignProject = {
  version: 1,
  name: "Modern compact flat",
  unit: "m",
  lastSavedAt: new Date().toISOString(),
  rooms: [
    {
      id: "room-living",
      name: "Living / Kitchen",
      x: 0.8,
      y: 0.8,
      width: 7.2,
      depth: 4.4,
      height: 2.8,
      floorMaterial: "oak",
      floorColor: "#c89155",
      wallColor: "#f8fafc",
    },
    {
      id: "room-bedroom",
      name: "Bedroom",
      x: 0.8,
      y: 5.45,
      width: 4.2,
      depth: 3.5,
      height: 2.8,
      floorMaterial: "linen",
      floorColor: "#d8c9ad",
      wallColor: "#e0e7ff",
    },
    {
      id: "room-bath",
      name: "Bathroom",
      x: 5.25,
      y: 5.45,
      width: 2.75,
      depth: 2.15,
      height: 2.65,
      floorMaterial: "sage",
      floorColor: "#91a88f",
      wallColor: "#ecfeff",
    },
  ],
  objects: [
    makeObject("Modular sofa", "room-living", 1.2, 1.25, 0),
    makeObject("Coffee table", "room-living", 2.1, 2.55, 0),
    makeObject("Media console", "room-living", 5.7, 1.05, 0),
    makeObject("Kitchen island", "room-living", 5.1, 3.5, 0),
    makeObject("Dining table", "room-living", 3.55, 3.45, 0),
    makeObject("Queen bed", "room-bedroom", 1.55, 6.2, 0),
    makeObject("Wardrobe", "room-bedroom", 3.1, 8.15, 0),
    makeObject("Shower", "room-bath", 5.55, 5.75, 0),
    makeObject("Vanity", "room-bath", 6.85, 5.75, 0),
  ],
};

function makeObject(name: string, roomId: string, x: number, y: number, rotation: number): FurnitureObject {
  const item = CATALOG.find((candidate) => candidate.name === name) ?? CATALOG[0];
  return {
    id: `${item.kind}-${crypto.randomUUID()}`,
    name: item.name,
    roomId,
    category: item.category,
    kind: item.kind,
    x,
    y,
    width: item.width,
    depth: item.depth,
    height: item.height,
    rotation,
    color: item.color,
    locked: false,
  };
}

function formatMeters(value: number) {
  return `${value.toFixed(2)}m`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function projectWithTimestamp(project: DesignProject): DesignProject {
  return { ...project, lastSavedAt: new Date().toISOString() };
}

function loadStoredProject(): DesignProject {
  if (typeof window === "undefined") return SAMPLE_PROJECT;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return SAMPLE_PROJECT;
  try {
    const parsed = JSON.parse(raw) as DesignProject;
    if (parsed.version === 1 && Array.isArray(parsed.rooms) && Array.isArray(parsed.objects)) {
      return parsed;
    }
  } catch {
    return SAMPLE_PROJECT;
  }
  return SAMPLE_PROJECT;
}

function roomArea(room: Room) {
  return room.width * room.depth;
}

function objectIcon(kind: FurnitureKind) {
  if (kind === "bed") return BedDouble;
  if (kind === "sofa") return Sofa;
  if (kind === "door" || kind === "window") return DoorOpen;
  if (kind === "plant") return LampFloor;
  return Box;
}

export default function DesignerStudio() {
  const [project, setProject] = useState<DesignProject>(() => loadStoredProject());
  const [selection, setSelection] = useState<Selection>({ type: "room", id: SAMPLE_PROJECT.rooms[0].id });
  const [catalogFilter, setCatalogFilter] = useState<FurnitureCategory | "all">("all");
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [aiGoal, setAiGoal] = useState("Make this flat feel larger, brighter, and easier to navigate while keeping a calm minimalist style.");
  const [aiResponse, setAiResponse] = useState<AiResponse | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedRoom = selection?.type === "room" ? project.rooms.find((room) => room.id === selection.id) ?? null : null;
  const selectedObject = selection?.type === "object" ? project.objects.find((object) => object.id === selection.id) ?? null : null;
  const activeRoom = selectedRoom ?? project.rooms.find((room) => room.id === selectedObject?.roomId) ?? project.rooms[0];
  const filteredCatalog = catalogFilter === "all" ? CATALOG : CATALOG.filter((item) => item.category === catalogFilter);

  const metrics = useMemo(() => {
    const area = project.rooms.reduce((sum, room) => sum + roomArea(room), 0);
    const furnitureArea = project.objects.reduce((sum, object) => sum + object.width * object.depth, 0);
    return {
      area,
      furnitureArea,
      openRatio: area > 0 ? Math.max(0, (area - furnitureArea) / area) : 0,
      rooms: project.rooms.length,
      objects: project.objects.length,
    };
  }, [project]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projectWithTimestamp(project)));
  }, [project]);

  function updateProject(updater: (current: DesignProject) => DesignProject) {
    setProject((current) => projectWithTimestamp(updater(current)));
  }

  function updateRoom(roomId: string, patch: Partial<Room>) {
    updateProject((current) => ({
      ...current,
      rooms: current.rooms.map((room) => (room.id === roomId ? { ...room, ...patch } : room)),
    }));
  }

  function updateObject(objectId: string, patch: Partial<FurnitureObject>) {
    updateProject((current) => ({
      ...current,
      objects: current.objects.map((object) => (object.id === objectId ? { ...object, ...patch } : object)),
    }));
  }

  function addRoom() {
    const id = `room-${crypto.randomUUID()}`;
    const room: Room = {
      id,
      name: `Room ${project.rooms.length + 1}`,
      x: 1.2 + project.rooms.length * 0.25,
      y: 1.2 + project.rooms.length * 0.25,
      width: 3.6,
      depth: 3,
      height: 2.7,
      floorMaterial: "oak",
      floorColor: MATERIALS.oak.color,
      wallColor: "#f8fafc",
    };
    updateProject((current) => ({ ...current, rooms: [...current.rooms, room] }));
    setSelection({ type: "room", id });
  }

  function divideRoom(axis: "vertical" | "horizontal") {
    if (!activeRoom) return;
    const firstId = `room-${crypto.randomUUID()}`;
    const secondId = `room-${crypto.randomUUID()}`;
    const first: Room = {
      ...activeRoom,
      id: firstId,
      name: `${activeRoom.name} A`,
      width: axis === "vertical" ? activeRoom.width / 2 : activeRoom.width,
      depth: axis === "horizontal" ? activeRoom.depth / 2 : activeRoom.depth,
    };
    const second: Room = {
      ...activeRoom,
      id: secondId,
      name: `${activeRoom.name} B`,
      x: axis === "vertical" ? activeRoom.x + activeRoom.width / 2 : activeRoom.x,
      y: axis === "horizontal" ? activeRoom.y + activeRoom.depth / 2 : activeRoom.y,
      width: axis === "vertical" ? activeRoom.width / 2 : activeRoom.width,
      depth: axis === "horizontal" ? activeRoom.depth / 2 : activeRoom.depth,
      floorMaterial: axis === "vertical" ? "concrete" : "sage",
      floorColor: axis === "vertical" ? MATERIALS.concrete.color : MATERIALS.sage.color,
    };
    updateProject((current) => ({
      ...current,
      rooms: current.rooms.flatMap((room) => (room.id === activeRoom.id ? [first, second] : [room])),
      objects: current.objects.map((object) => (object.roomId === activeRoom.id ? { ...object, roomId: firstId } : object)),
    }));
    setSelection({ type: "room", id: firstId });
  }

  function addObject(item: CatalogItem) {
    if (!activeRoom) return;
    const object = makeObject(
      item.name,
      activeRoom.id,
      activeRoom.x + Math.max(0.25, (activeRoom.width - item.width) / 2),
      activeRoom.y + Math.max(0.25, (activeRoom.depth - item.depth) / 2),
      0,
    );
    updateProject((current) => ({ ...current, objects: [...current.objects, object] }));
    setSelection({ type: "object", id: object.id });
  }

  function duplicateSelection() {
    if (!selectedObject) return;
    const duplicate: FurnitureObject = {
      ...selectedObject,
      id: `${selectedObject.kind}-${crypto.randomUUID()}`,
      x: selectedObject.x + 0.35,
      y: selectedObject.y + 0.35,
      locked: false,
    };
    updateProject((current) => ({ ...current, objects: [...current.objects, duplicate] }));
    setSelection({ type: "object", id: duplicate.id });
  }

  function deleteSelection() {
    if (!selection) return;
    updateProject((current) => {
      if (selection.type === "object") {
        return { ...current, objects: current.objects.filter((object) => object.id !== selection.id) };
      }
      if (current.rooms.length <= 1) return current;
      const nextRooms = current.rooms.filter((room) => room.id !== selection.id);
      const fallbackRoomId = nextRooms[0].id;
      return {
        ...current,
        rooms: nextRooms,
        objects: current.objects.map((object) => (object.roomId === selection.id ? { ...object, roomId: fallbackRoomId } : object)),
      };
    });
    setSelection(null);
  }

  function pointFromEvent(event: PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (event.clientX - rect.left) / SCALE,
      y: (event.clientY - rect.top) / SCALE,
    };
  }

  function handleObjectPointerDown(event: PointerEvent<SVGRectElement>, object: FurnitureObject) {
    if (object.locked) return;
    event.stopPropagation();
    const point = pointFromEvent(event as unknown as PointerEvent<SVGSVGElement>);
    setSelection({ type: "object", id: object.id });
    setDragState({ objectId: object.id, offsetX: point.x - object.x, offsetY: point.y - object.y });
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!dragState) return;
    const object = project.objects.find((candidate) => candidate.id === dragState.objectId);
    if (!object) return;
    const room = project.rooms.find((candidate) => candidate.id === object.roomId);
    if (!room) return;
    const point = pointFromEvent(event);
    updateObject(object.id, {
      x: clamp(point.x - dragState.offsetX, room.x + 0.05, room.x + room.width - object.width - 0.05),
      y: clamp(point.y - dragState.offsetY, room.y + 0.05, room.y + room.depth - object.depth - 0.05),
    });
  }

  function handlePointerUp() {
    setDragState(null);
  }

  function resetToSample() {
    const nextProject = projectWithTimestamp(SAMPLE_PROJECT);
    setProject(nextProject);
    setSelection({ type: "room", id: nextProject.rooms[0].id });
    setAiResponse(null);
  }

  function exportProject() {
    const blob = new Blob([JSON.stringify(projectWithTimestamp(project), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "design"}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importProject(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      try {
        const parsed = JSON.parse(reader.result) as DesignProject;
        if (parsed.version === 1 && Array.isArray(parsed.rooms) && Array.isArray(parsed.objects)) {
          setProject(projectWithTimestamp(parsed));
          setSelection(parsed.rooms[0] ? { type: "room", id: parsed.rooms[0].id } : null);
          setAiError(null);
        } else {
          setAiError("That file is not a valid designer project.");
        }
      } catch {
        setAiError("Could not read that project JSON file.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  async function askAiAssistant() {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch("/api/designer/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project, goal: aiGoal }),
      });
      if (!response.ok) throw new Error("Assistant request failed");
      const data = (await response.json()) as AiResponse;
      setAiResponse(data);
    } catch {
      setAiError("AI assistant is unavailable right now. The local design metrics still work.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/60 bg-card/50 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1 border-primary/40 bg-primary/10 text-primary">
                <Layers3 className="h-3 w-3" /> Local 3D design studio
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3 text-band-7" /> Gemini-ready AI assistant
              </Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Build precise interiors in 2D and 3D</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              A modern room and flat designer inspired by Sweet Home 3D, Floorplanner, RoomSketcher, Planner 5D, and Home Planner — with precise measurements, local saves, open exports, and no paywalled editor basics.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={resetToSample} className="gap-2">
              <Eraser className="h-4 w-4" /> Sample
            </Button>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload className="h-4 w-4" /> Import
            </Button>
            <Button onClick={exportProject} className="gap-2 shadow-glow">
              <Download className="h-4 w-4" /> Export JSON
            </Button>
            <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importProject} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)_340px] lg:px-8">
        <aside className="space-y-4">
          <Card className="glass shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Save className="h-4 w-4 text-primary" /> Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="project-name">Project name</Label>
                <Input id="project-name" value={project.name} onChange={(event) => updateProject((current) => ({ ...current, name: event.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Metric label="Total area" value={`${metrics.area.toFixed(1)} m²`} />
                <Metric label="Open space" value={`${Math.round(metrics.openRatio * 100)}%`} />
                <Metric label="Rooms" value={String(metrics.rooms)} />
                <Metric label="Objects" value={String(metrics.objects)} />
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Home className="h-4 w-4 text-primary" /> Rooms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={addRoom} className="gap-2"><Plus className="h-4 w-4" /> Add</Button>
                <Button variant="outline" onClick={() => divideRoom("vertical")} className="gap-2"><SplitSquareHorizontal className="h-4 w-4" /> Divide</Button>
              </div>
              <div className="space-y-2">
                {project.rooms.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setSelection({ type: "room", id: room.id })}
                    className={cn(
                      "w-full rounded-xl border p-3 text-left transition-colors",
                      selection?.type === "room" && selection.id === room.id
                        ? "border-primary/70 bg-primary/10"
                        : "border-border/60 bg-muted/20 hover:bg-muted/40",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{room.name}</span>
                      <span className="text-xs text-muted-foreground">{roomArea(room).toFixed(1)} m²</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{formatMeters(room.width)} × {formatMeters(room.depth)} · {MATERIALS[room.floorMaterial].label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Box className="h-4 w-4 text-primary" /> Object catalog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <select
                value={catalogFilter}
                onChange={(event) => setCatalogFilter(event.target.value as FurnitureCategory | "all")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="all">All categories</option>
                <option value="living">Living</option>
                <option value="bedroom">Bedroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="bath">Bathroom</option>
                <option value="openings">Doors / windows</option>
                <option value="decor">Decor</option>
              </select>
              <div className="grid gap-2">
                {filteredCatalog.map((item) => {
                  const Icon = objectIcon(item.kind);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => addObject(item)}
                      className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-3 text-left text-sm transition-colors hover:bg-muted/50"
                    >
                      <span className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /> {item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.width}×{item.depth}m</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-4">
          <Card className="glass overflow-hidden shadow-card">
            <CardHeader className="flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Grid3X3 className="h-4 w-4 text-primary" /> Precision 2D plan</CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Ruler className="h-3 w-3" /> grid = 1 meter</div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-slate-950/70">
                <svg
                  ref={svgRef}
                  width="100%"
                  height="540"
                  viewBox="0 0 520 410"
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  onPointerDown={() => setSelection(null)}
                  className="touch-none select-none"
                >
                  <defs>
                    <pattern id="grid" width={SCALE} height={SCALE} patternUnits="userSpaceOnUse">
                      <path d={`M ${SCALE} 0 L 0 0 0 ${SCALE}`} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
                    </pattern>
                    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.35" />
                    </filter>
                  </defs>
                  <rect width="520" height="410" fill="url(#grid)" />
                  {project.rooms.map((room) => {
                    const selected = selection?.type === "room" && selection.id === room.id;
                    return (
                      <g key={room.id} onPointerDown={(event) => { event.stopPropagation(); setSelection({ type: "room", id: room.id }); }}>
                        <rect
                          x={room.x * SCALE}
                          y={room.y * SCALE}
                          width={room.width * SCALE}
                          height={room.depth * SCALE}
                          rx="10"
                          fill={room.floorColor}
                          fillOpacity="0.32"
                          stroke={selected ? "#818cf8" : "#e2e8f0"}
                          strokeWidth={selected ? 5 : 3}
                          filter="url(#soft-shadow)"
                        />
                        <text x={(room.x + 0.18) * SCALE} y={(room.y + 0.38) * SCALE} fill="#f8fafc" fontSize="12" fontWeight="700">{room.name}</text>
                        <text x={(room.x + 0.18) * SCALE} y={(room.y + 0.72) * SCALE} fill="#cbd5e1" fontSize="10">{roomArea(room).toFixed(1)}m² · {room.width.toFixed(2)}×{room.depth.toFixed(2)}m</text>
                        <line x1={room.x * SCALE} y1={(room.y + room.depth + 0.16) * SCALE} x2={(room.x + room.width) * SCALE} y2={(room.y + room.depth + 0.16) * SCALE} stroke="#94a3b8" strokeDasharray="4 5" />
                        <text x={(room.x + room.width / 2 - 0.28) * SCALE} y={(room.y + room.depth + 0.42) * SCALE} fill="#94a3b8" fontSize="10">{room.width.toFixed(2)}m</text>
                      </g>
                    );
                  })}
                  {project.objects.map((object) => {
                    const selected = selection?.type === "object" && selection.id === object.id;
                    const Icon = objectIcon(object.kind);
                    const centerX = (object.x + object.width / 2) * SCALE;
                    const centerY = (object.y + object.depth / 2) * SCALE;
                    return (
                      <g key={object.id} transform={`rotate(${object.rotation} ${centerX} ${centerY})`}>
                        <rect
                          x={object.x * SCALE}
                          y={object.y * SCALE}
                          width={object.width * SCALE}
                          height={object.depth * SCALE}
                          rx="8"
                          fill={object.color}
                          fillOpacity={object.locked ? "0.55" : "0.82"}
                          stroke={selected ? "#fbbf24" : "rgba(255,255,255,0.75)"}
                          strokeWidth={selected ? 4 : 1.5}
                          onPointerDown={(event) => handleObjectPointerDown(event, object)}
                          className={object.locked ? "cursor-not-allowed" : "cursor-move"}
                        />
                        <foreignObject x={(object.x + 0.05) * SCALE} y={(object.y + 0.05) * SCALE} width={Math.max(24, object.width * SCALE - 4)} height={Math.max(24, object.depth * SCALE - 4)} pointerEvents="none">
                          <div className="flex h-full items-center justify-center text-white drop-shadow">
                            <Icon className="h-4 w-4" />
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="glass overflow-hidden shadow-card">
            <CardHeader className="flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Eye className="h-4 w-4 text-primary" /> Live 3D preview</CardTitle>
              <Badge variant="outline">Orbit / zoom / inspect</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[520px] overflow-hidden rounded-2xl border border-border/60 bg-slate-950">
                <Canvas camera={{ position: [6, 7, 9], fov: 48 }} shadows>
                  <color attach="background" args={["#070712"]} />
                  <ambientLight intensity={0.55} />
                  <directionalLight position={[6, 8, 5]} intensity={1.25} castShadow />
                  <pointLight position={[1, 4, 2]} intensity={0.45} color="#a5b4fc" />
                  <Scene project={project} selection={selection} />
                  <OrbitControls makeDefault enableDamping minDistance={4} maxDistance={22} maxPolarAngle={Math.PI / 2.05} />
                </Canvas>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-4">
          <Card className="glass shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Move className="h-4 w-4 text-primary" /> Inspector</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selection && <p className="text-sm text-muted-foreground">Select a room or object on the plan to edit exact dimensions, colors, materials, and rotation.</p>}
              {selectedRoom && (
                <RoomInspector room={selectedRoom} onChange={(patch) => updateRoom(selectedRoom.id, patch)} />
              )}
              {selectedObject && (
                <ObjectInspector
                  object={selectedObject}
                  rooms={project.rooms}
                  onChange={(patch) => updateObject(selectedObject.id, patch)}
                  onDuplicate={duplicateSelection}
                />
              )}
              {selection && (
                <Button variant="destructive" onClick={deleteSelection} className="w-full gap-2">
                  <Trash2 className="h-4 w-4" /> Delete selected
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="glass shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><Bot className="h-4 w-4 text-primary" /> AI design assistant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea value={aiGoal} onChange={(event) => setAiGoal(event.target.value)} className="min-h-24" />
              <Button onClick={askAiAssistant} disabled={aiLoading} className="w-full gap-2">
                <Sparkles className="h-4 w-4" /> {aiLoading ? "Thinking…" : "Improve this design"}
              </Button>
              {aiError && <p className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive-foreground">{aiError}</p>}
              {aiResponse && (
                <div className="space-y-3 rounded-xl border border-border/60 bg-muted/20 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{aiResponse.summary}</p>
                    <Badge variant="outline">{aiResponse.provider}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {aiResponse.palette.map((color) => <span key={color} className="rounded-full border border-white/20 px-2 py-1 text-[10px]" style={{ backgroundColor: color }}>{color}</span>)}
                  </div>
                  <div className="space-y-2">
                    {aiResponse.suggestions.map((suggestion) => (
                      <div key={suggestion.title} className="rounded-lg bg-background/60 p-2">
                        <p className="text-xs font-semibold">{suggestion.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">{suggestion.details}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {aiResponse.checklist.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground"><Check className="mt-0.5 h-3 w-3 text-band-9" /> {item}</div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function RoomInspector({ room, onChange }: { room: Room; onChange: (patch: Partial<Room>) => void }) {
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label>Name</Label>
        <Input value={room.name} onChange={(event) => onChange({ name: event.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="X" value={room.x} onChange={(value) => onChange({ x: value })} />
        <NumberField label="Y" value={room.y} onChange={(value) => onChange({ y: value })} />
        <NumberField label="Width" value={room.width} min={1.2} onChange={(value) => onChange({ width: value })} />
        <NumberField label="Depth" value={room.depth} min={1.2} onChange={(value) => onChange({ depth: value })} />
        <NumberField label="Height" value={room.height} min={2} onChange={(value) => onChange({ height: value })} />
      </div>
      <div className="space-y-1.5">
        <Label>Floor material</Label>
        <select
          value={room.floorMaterial}
          onChange={(event) => {
            const material = event.target.value as Material;
            onChange({ floorMaterial: material, floorColor: MATERIALS[material].color });
          }}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          {Object.entries(MATERIALS).map(([key, material]) => <option key={key} value={key}>{material.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ColorField label="Floor" value={room.floorColor} onChange={(value) => onChange({ floorColor: value })} />
        <ColorField label="Walls" value={room.wallColor} onChange={(value) => onChange({ wallColor: value })} />
      </div>
    </div>
  );
}

function ObjectInspector({
  object,
  rooms,
  onChange,
  onDuplicate,
}: {
  object: FurnitureObject;
  rooms: Room[];
  onChange: (patch: Partial<FurnitureObject>) => void;
  onDuplicate: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{object.name}</p>
          <p className="text-xs text-muted-foreground">{object.category} · {object.kind}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onDuplicate} className="gap-1"><Plus className="h-3 w-3" /> Copy</Button>
      </div>
      <div className="space-y-1.5">
        <Label>Room</Label>
        <select value={object.roomId} onChange={(event) => onChange({ roomId: event.target.value })} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
          {rooms.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="X" value={object.x} onChange={(value) => onChange({ x: value })} />
        <NumberField label="Y" value={object.y} onChange={(value) => onChange({ y: value })} />
        <NumberField label="Width" value={object.width} min={0.1} onChange={(value) => onChange({ width: value })} />
        <NumberField label="Depth" value={object.depth} min={0.1} onChange={(value) => onChange({ depth: value })} />
        <NumberField label="Height" value={object.height} min={0.05} onChange={(value) => onChange({ height: value })} />
        <NumberField label="Rotation" value={object.rotation} step={5} onChange={(value) => onChange({ rotation: value })} />
      </div>
      <ColorField label="Object color" value={object.color} onChange={(value) => onChange({ color: value })} />
      <Button variant="outline" onClick={() => onChange({ rotation: (object.rotation + 90) % 360 })} className="w-full gap-2">
        <RotateCw className="h-4 w-4" /> Rotate 90°
      </Button>
      <Button variant="outline" onClick={() => onChange({ locked: !object.locked })} className="w-full gap-2">
        <ArrowDownToLine className="h-4 w-4" /> {object.locked ? "Unlock placement" : "Lock placement"}
      </Button>
    </div>
  );
}

function NumberField({ label, value, min = 0, step = 0.05, onChange }: { label: string; value: number; min?: number; step?: number; onChange: (value: number) => void }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type="number" min={min} step={step} value={Number.isFinite(value) ? value : 0} onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-14 p-1" />
        <Input value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </div>
  );
}

function Scene({ project, selection }: { project: DesignProject; selection: Selection }) {
  return (
    <group position={[-3.8, 0, -3.5]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.4, -0.04, 4.6]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.95} />
      </mesh>
      <gridHelper args={[12, 12, "#475569", "#1e293b"]} position={[4.4, 0.005, 4.6]} />
      {project.rooms.map((room) => <RoomModel key={room.id} room={room} selected={selection?.type === "room" && selection.id === room.id} />)}
      {project.objects.map((object) => <ObjectModel key={object.id} object={object} selected={selection?.type === "object" && selection.id === object.id} />)}
    </group>
  );
}

function RoomModel({ room, selected }: { room: Room; selected: boolean }) {
  const wallMaterial = selected ? "#a5b4fc" : room.wallColor;
  return (
    <group>
      <mesh position={[room.x + room.width / 2, 0.03, room.y + room.depth / 2]} receiveShadow>
        <boxGeometry args={[room.width, 0.06, room.depth]} />
        <meshStandardMaterial color={room.floorColor} roughness={0.6} metalness={room.floorMaterial === "marble" ? 0.18 : 0.02} />
      </mesh>
      <Wall position={[room.x + room.width / 2, room.height / 2, room.y]} size={[room.width, room.height, WALL_THICKNESS]} color={wallMaterial} />
      <Wall position={[room.x + room.width / 2, room.height / 2, room.y + room.depth]} size={[room.width, room.height, WALL_THICKNESS]} color={wallMaterial} />
      <Wall position={[room.x, room.height / 2, room.y + room.depth / 2]} size={[WALL_THICKNESS, room.height, room.depth]} color={wallMaterial} />
      <Wall position={[room.x + room.width, room.height / 2, room.y + room.depth / 2]} size={[WALL_THICKNESS, room.height, room.depth]} color={wallMaterial} />
    </group>
  );
}

function Wall({ position, size, color }: { position: [number, number, number]; size: [number, number, number]; color: string }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={0.58} roughness={0.8} />
    </mesh>
  );
}

function ObjectModel({ object, selected }: { object: FurnitureObject; selected: boolean }) {
  const emissive = selected ? "#f59e0b" : "#000000";
  return (
    <group position={[object.x + object.width / 2, object.height / 2 + 0.06, object.y + object.depth / 2]} rotation={[0, (object.rotation * Math.PI) / 180, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[object.width, object.height, object.depth]} />
        <meshStandardMaterial color={object.color} emissive={emissive} emissiveIntensity={selected ? 0.18 : 0} roughness={0.55} metalness={object.kind === "fixture" ? 0.18 : 0.02} />
      </mesh>
      {object.kind === "sofa" && <mesh position={[0, object.height * 0.35, -object.depth * 0.28]} castShadow><boxGeometry args={[object.width, object.height * 0.55, 0.16]} /><meshStandardMaterial color="#cbd5e1" roughness={0.7} /></mesh>}
      {object.kind === "bed" && <mesh position={[0, object.height * 0.35, object.depth * 0.32]} castShadow><boxGeometry args={[object.width * 0.82, object.height * 0.28, object.depth * 0.18]} /><meshStandardMaterial color="#e0e7ff" roughness={0.9} /></mesh>}
      {object.kind === "plant" && <mesh position={[0, object.height * 0.58, 0]} castShadow><sphereGeometry args={[Math.max(object.width, object.depth) * 0.45, 16, 16]} /><meshStandardMaterial color="#22c55e" roughness={0.75} /></mesh>}
      {object.kind === "door" && <mesh position={[0, object.height * 0.08, 0]} castShadow><boxGeometry args={[object.width * 0.95, object.height * 1.02, 0.03]} /><meshStandardMaterial color="#d97706" roughness={0.55} /></mesh>}
      {object.kind === "window" && <mesh position={[0, object.height * 0.15, 0]} castShadow><boxGeometry args={[object.width, object.height * 0.72, 0.04]} /><meshStandardMaterial color="#7dd3fc" transparent opacity={0.48} roughness={0.1} metalness={0.35} /></mesh>}
    </group>
  );
}
