export interface SceneState {
  coreX: number; coreY: number; coreScale: number; amp: number; wire: number; rings: number; glow: number;
  projMix: number; proj: number; spin: number; intro: number;
}
export const S: SceneState;
export function initScene(canvas: HTMLCanvasElement, opts?: { reduced?: boolean }): { renderer: unknown; dispose: () => void } | null;
