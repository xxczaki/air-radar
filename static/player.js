// Changelog.com podcast player
!function(e){function t(t){var r=t.getAttribute('data-src'),n=t.getAttribute('data-theme')||'night',i=e.createElement('iframe');i.setAttribute('src',r+'?theme='+n+'&referrer='+e.location.href),i.setAttribute('width','100%'),i.setAttribute('height','220'),i.setAttribute('scrolling','no'),i.setAttribute('frameborder','no'),t.parentNode.replaceChild(i,t),this.id=+new Date,this.src=i.src,this.iframe=i}var r='https://changelog.com',n=e.getElementsByClassName('changelog-episode'),i=[],a=function(e,t){t.context='player.js',t.version='0.0.11',t.listener=e.id,e.iframe.contentWindow.postMessage(JSON.stringify(t),r)},s=function(e){if(e.origin!==r)return!1;var t=JSON.parse(e.data);if('player.js'!==t.context)return!1;if('ready'===t.event)for(var n=i.length-1;n>=0;n--)i[n].src===t.value.src&&a(i[n],{method:'addEventListener',value:'play'});if('play'===t.event)for(var n=i.length-1;n>=0;n--)i[n].id!==t.listener&&a(i[n],{method:'pause'})};window.addEventListener('message',s);for(var o=n.length-1;o>-1;o--)i.push(new t(n[o]))}(document);