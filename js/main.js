// ==================== 主入口 ====================
function init(){
  document.getElementById('modal-overlay').addEventListener('click',function(e){
    if(e.target===this)closeModal();
  });
  updateUI();
  renderNode('start');
}
init();