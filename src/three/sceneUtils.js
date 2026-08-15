export function handleResize(renderer, camera, container) {
  const { clientWidth, clientHeight } = container
  renderer.setSize(clientWidth, clientHeight)
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
}
