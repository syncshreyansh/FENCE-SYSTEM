export function createFarmScene(container) {
  return { container }
}

export function destroyFarmScene(scene) {
  if (scene && scene.renderer) {
    scene.renderer.dispose()
  }
}
