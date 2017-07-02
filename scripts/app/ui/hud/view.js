function app_ui_hud_view(
    three
) {
  this.sprite = make_healthbar();

  function make_healthbar() {
    return new three.Mesh(
      new three.PlaneGeometry(1, .02)
    , new three.MeshBasicMaterial({ color: 0xAA2000 })
    );
  }
}
