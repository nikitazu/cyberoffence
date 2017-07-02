function app_arena_view(
    three
) {
  this.sprite = make_ground();

  function make_ground() {
    return new three.Mesh(
      new three.PlaneGeometry(30, 10)
    , new three.MeshBasicMaterial({ color: 0x302000 })
    );
  }
}
