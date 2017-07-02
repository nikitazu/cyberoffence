function app_fighter_view(
    three
  ) {
  this.sprite = new three.Mesh(
    new three.PlaneGeometry(3, 7)
  , new three.MeshBasicMaterial({ color: 0x552200 })
  );
}
