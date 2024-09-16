window.addEventListener('DOMContentLoaded', () => {
  // 获取加载动画和文字元素
  const loader = document.querySelector('.loader');
  const text = document.querySelector('.text');
  const siteloader = document.getElementById('site-loader');

  // 隐藏加载动画和文字
  const hideLoader = () => {
    loader.style.display = 'none';
	siteloader.style.display = 'none'; 
    text.style.display = 'none';
  };

  // DOM内容加载完成后，隐藏加载动画和文字
  hideLoader();
});