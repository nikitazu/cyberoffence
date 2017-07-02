function app_attack_view(
    three
) {
  this.attacks = [];
}

function app_attack_view_item(
    three
) {
  this.sprite = new three.Mesh(
    new three.PlaneGeometry(1, 1)
  , new three.MeshBasicMaterial({ color: 0x101000 })
  );
}
