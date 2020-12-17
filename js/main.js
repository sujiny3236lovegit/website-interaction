(()=>{

  let yOffset = 0; // window.pageYOffset 관련 변수 
  let prevScrollHeight = 0; //현 yOffset(스크롤 위치)의 이전 섹션들의 스크롤 높이 값의 합
  let currentScene = 0; //현재 활성화된 scroll-section

  const sceneInfo = [
    {
      // scroll-section-0
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅(사용자의 비슷한 경험을 위함)
      scrollHeight: 0,
      objs : {
        container: document.querySelector('#scroll-section-0')
      }
    },
    {
      // scroll-section-1
      type: 'normal',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // scroll-section-2
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // scroll-section-3
      type: 'sticky',
      heightNum: 5, 
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  function setLayout(){
    // 각 스크롤 섹션의 높이 세팅
    for(let i = 0; i < sceneInfo.length; i++){
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for(let i = 0; i < sceneInfo.length; i++){
      totalScrollHeight = totalScrollHeight + sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset){
        currentScene = i;
        break;
      }
    }
  };

  function scrollLoop(){
    // 현재 활성 중인 scroll-section
    prevScrollHeight = 0;
    for(let i = 0; i < currentScene; i++){
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }

    // currnetScene 증가
    if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // currentScene 감소
    if(yOffset < prevScrollHeight){
      if(currentScene === 0) return; //mobile bounce방지
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    // document.body.setAttribute('id', `show-scene-${currentScene}`);
  };
  
  window.addEventListener('scroll', ()=> {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);

})();

