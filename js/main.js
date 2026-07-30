// ==================== 主入口 ====================
function init(){
  document.getElementById('modal-overlay').addEventListener('click',function(e){
    if(e.target===this)closeModal();
  });
  addGuToInventory('月光蛊');
  buildPlayerStats();
  updateUI();
  renderNode('start');
}
init();