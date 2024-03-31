/* eslint-disable */
// @ts-nocheck

let msgEl, infoEl;
function showMsg(t, n) {
  (msgEl.innerText = t + ': ' + (n ? 'ON' : 'OFF')),
    (msgEl.style.display = 'none'),
    msgEl.offsetWidth,
    (msgEl.style.display = '');
}
(window.XMLHttpRequest = class extends window.XMLHttpRequest {
  open(t, n) {
    return (
      n.indexOf('shellshock.js') > -1 && (this.isScript = !0),
      super.open(...arguments)
    );
  }
  get response() {
    if (this.isScript) {
      const t = super.response,
        n = /new ([a-zA-Z]+)\.Vector3/.exec(t)[1],
        e = /([^,]+)=\[\],{}/.exec(t)[1],
        i = /"fire":document.pointerLockElement&&([^&]+)&&/.exec(t)[1],
        o = /createMapCells\(([^,]+),/.exec(t)[1],
        s = /=([a-zA-Z]+)\(this\.mesh,\.[0-9]+\)/.exec(t)[1];
      return (
        console.log(
          '%cInjecting code...',
          'color: red; background: black; font-size: 2em;',
          {
            babylonVarName: n,
            playersVarName: e,
            myPlayerVarName: i,
            playersVarName: e,
            sceneVarName: o,
            cullFuncName: s,
          }
        ),
        t
          .replace(
            o + '.render()',
            `( function () {\n\n\t\t\t\tif ( window.shouldShowAd !== false ) {\n\n\t\t\t\t\treturn;\n\n\t\t\t\t}\n\n\t\t\t\tconst players = ${e};\n\t\t\t\tconst myPlayer = ${i};\n\t\t\t\tconst BABYLON = ${n};\n\n\t\t\t\tif ( ! myPlayer ) {\n\n\t\t\t\t\treturn;\n\n\t\t\t\t}\n\n\t\t\t\tif ( ! window.lineOrigin ) {\n\n\t\t\t\t\twindow.lineOrigin = new BABYLON.Vector3();\n\t\t\t\t\twindow.lines = [];\n\n\t\t\t\t}\n\n\t\t\t\twindow.lineOrigin.copyFrom( myPlayer.actor.mesh.position );\n\n\t\t\t\tconst yaw = myPlayer.actor.mesh.rotation.y;\n\n\t\t\t\twindow.lineOrigin.x += Math.sin( yaw );\n\t\t\t\twindow.lineOrigin.z += Math.cos( yaw );\n\t\t\t\twindow.lineOrigin.y += Math.sin( - myPlayer.pitch );\n\n\t\t\t\tfor ( let i = 0; i < window.lines.length; i ++ ) {\n\n\t\t\t\t\twindow.lines[ i ].playerExists = false;\n\n\t\t\t\t}\n\n\t\t\t\tfor ( let i = 0; i < players.length; i ++ ) {\n\n\t\t\t\t\tconst player = players[ i ];\n\n\t\t\t\t\tif ( ! player || player === myPlayer ) {\n\n\t\t\t\t\t\tcontinue;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif ( player.sphere === undefined ) {\n\n\t\t\t\t\t\tconsole.log( 'Adding sphere...' );\n\n\t\t\t\t\t\tconst material = new BABYLON.StandardMaterial( 'myMaterial', player.actor.scene );\n\t\t\t\t\t\tmaterial.emissiveColor = material.diffuseColor = new BABYLON.Color3( 1, 0, 0 );\n\t\t\t\t\t\tmaterial.wireframe = true;\n\n\t\t\t\t\t\tconst sphere = BABYLON.MeshBuilder.CreateBox( 'mySphere', { width: 0.5, height: 0.75, depth: 0.5 }, player.actor.scene );\n\t\t\t\t\t\tsphere.material = material;\n\t\t\t\t\t\tsphere.position.y = 0.3;\n\n\t\t\t\t\t\tsphere.parent = player.actor.mesh;\n\n\t\t\t\t\t\tplayer.sphere = sphere;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif ( player.lines === undefined ) {\n\n\t\t\t\t\t\tconst options = {\n\t\t\t\t\t\t\tpoints: [ window.lineOrigin, player.actor.mesh.position ],\n\t\t\t\t\t\t\tupdatable: true\n\t\t\t\t\t\t};\n\n\t\t\t\t\t\tconst lines = options.instance = BABYLON.MeshBuilder.CreateLines( 'lines', options, player.actor.scene );\n\t\t\t\t\t\tlines.color = new BABYLON.Color3( 1, 0, 0 );\n\t\t\t\t\t\tlines.alwaysSelectAsActiveMesh = true;\n\t\t\t\t\t\tlines.renderingGroupId = 1;\n\n\t\t\t\t\t\tplayer.lines = lines;\n\t\t\t\t\t\tplayer.lineOptions = options;\n\n\t\t\t\t\t\twindow.lines.push( lines );\n\n\t\t\t\t\t\tconsole.log( '%cAdding line...', 'color: green; background: black; font-size: 2em;' );\n\n\t\t\t\t\t}\n\n\t\t\t\t\tplayer.lines.playerExists = true;\n\t\t\t\t\tplayer.lines = BABYLON.MeshBuilder.CreateLines( 'lines', player.lineOptions );\n\n\t\t\t\t\tplayer.sphere.renderingGroupId = window.espEnabled ? 1 : 0;\n\t\t\t\t\tplayer.sphere.visibility = ( window.aimbotEnabled || window.espEnabled ) && myPlayer !== player && ( myPlayer.team === 0 || myPlayer.team !== player.team );\n\n\t\t\t\t\tplayer.lines.visibility = player.playing && player.sphere.visibility && window.showLines;\n\n\t\t\t\t}\n\n\t\t\t\tfor ( let i = 0; i < window.lines.length; i ++ ) {\n\n\t\t\t\t\tif ( ! window.lines[ i ].playerExists ) {\n\n\t\t\t\t\t\tconsole.log( '%cRemoving line...', 'color: red; background: black; font-size: 2em;' );\n\n\t\t\t\t\t\twindow.lines[ i ].dispose();\n\t\t\t\t\t\twindow.lines.splice( i, 1 );\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\tif ( window.aimbotEnabled && myPlayer.playing ) {\n\n\t\t\t\t\tlet minDistance = Infinity;\n\t\t\t\t\tlet targetPlayer;\n\n\t\t\t\t\tfor ( let i = 0; i < players.length; i ++ ) {\n\n\t\t\t\t\t\tconst player = players[ i ];\n\n\t\t\t\t\t\tif ( player && player !== myPlayer && player.playing && ( myPlayer.team === 0 || player.team !== myPlayer.team ) ) {\n\n\t\t\t\t\t\t\tconst distance = Math.hypot( player.x - myPlayer.x, player.y - myPlayer.y, player.z - myPlayer.z );\n\n\t\t\t\t\t\t\tif ( distance < minDistance ) {\n\n\t\t\t\t\t\t\t\tminDistance = distance;\n\n\t\t\t\t\t\t\t\ttargetPlayer = player;\n\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\tif ( targetPlayer ) {\n\n\t\t\t\t\t\tconst x = targetPlayer.actor.mesh.position.x - myPlayer.actor.mesh.position.x;\n\t\t\t\t\t\tconst y = targetPlayer.actor.mesh.position.y - myPlayer.actor.mesh.position.y;\n\t\t\t\t\t\tconst z = targetPlayer.actor.mesh.position.z - myPlayer.actor.mesh.position.z;\n\n\t\t\t\t\t\tmyPlayer.yaw = Math.radAdd( Math.atan2( x, z ), 0 );\n\t\t\t\t\t\tmyPlayer.pitch = - Math.atan2( y, Math.hypot( x, z ) ) % 1.5;\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t} )(); ${o}.render()`
          )
          .replace(
            `function ${s}`,
            `\n\n\t\t\t\t\tfunction ${s}() {\n\n\t\t\t\t\t\treturn true;\n\n\t\t\t\t\t}\n\n\t\t\t\tfunction someFunctionWhichWillNeverBeUsedNow`
          )
      );
    }
    return super.response;
  }
}),
  (window.espEnabled = !0),
  (window.aimbotEnabled = !0),
  (window.showLines = !0),
  window.addEventListener('keyup', function (t) {
    if (!document.activeElement || 'INPUT' !== document.activeElement.tagName)
      switch (t.code) {
        case 'KeyB':
          (window.aimbotEnabled = !window.aimbotEnabled),
            showMsg('Aimbot', window.aimbotEnabled);
          break;
        case 'KeyV':
          (window.espEnabled = !window.espEnabled),
            showMsg('ESP', window.espEnabled);
          break;
        case 'KeyN':
          (window.showLines = !window.showLines),
            showMsg('ESP Lines', window.showLines);
          break;
        case 'KeyH':
          infoEl.style.display = '' === infoEl.style.display ? 'none' : '';
      }
  });
const value = parseInt(
  new URLSearchParams(window.location.search).get('showAd'),
  16
);
(window.shouldShowAd = !1),
  (window.injectScript = async () => {
    const t = document.createElement('div');
    for (
      t.innerHTML =
        '\n\t<style>\n\n\t.msg {\n\t\tposition: absolute;\n\t\tleft: 10px;\n\t\tbottom: 10px;\n\t\tcolor: #0E7697;\n\t\tfont-weight: bolder;\n\t\tpadding: 15px;\n\t\tanimation: msg 0.5s forwards, msg 0.5s reverse forwards 3s;\n\t\tz-index: 999999;\n\t\tpointer-events: none;\n\t}\n\n\t@keyframes msg {\n\t\tfrom {\n\t\t\ttransform: translate(-120%, 0);\n\t\t}\n\n\t\tto {\n\t\t\ttransform: none;\n\t\t}\n\t}\n\n\t</style>\n\t<div class="popup_window popup_lg roundme_lg msg" style="display: none;"></div>\n\t<div class="popup_window popup_lg centered roundme_lg info" style="z-index: 9999999;">' +
        (shouldShowAd
          ? '<h1 class="roundme_sm">Loading ad...</h1>'
          : '<button class="popup_close clickme roundme_sm" onclick="this.parentNode.style.display=\'none\';"></button>\n\t\t<h1 class="roundme_sm">Aimbot & ESP!</h1>\n\t\t<h4 style="text-align:center;">\n\t\t\tKeys:\n\t\t\t<br>\n\t\t\t[B] to toggle aimbot\n\t\t\t<br>\n\t\t\t[V] to toggle ESP\n\t\t\t<br>\n\t\t\t[N] to toggle ESP lines\n\t\t\t<br>\n\t\t\t[H] to show/hide help\n\t\t\t<br>\n\t\t\t<br>\n\t\t\tBy Zertalious\n\t\t</h4>\n\t\t<div id="btn-horizontal" class="f-center">\n\t\t\t<button class="ss_button btn_red bevel_red btn_sm" onclick="window.open(\'https://discord.gg/K24Zxy88VM\', \'_blank\')">Discord</button>\n\t\t\t<button class="ss_button btn_yolk bevel_yolk btn_sm" onclick="window.open(\'https://greasyfork.org/en/users/662330-zertalious\', \'_blank\')">More scripts</button>\n\t\t</div>\n\t\t<div id="btn-horizontal" class="f-center">\n\t\t\t<button class="ss_button btn_green bevel_green btn_sm" onclick="window.open(\'https://www.instagram.com/zertalious/\', \'_blank\')">Instagram</button>\n\t\t\t<button class="ss_button btn_blue bevel_blue btn_sm" onclick="window.open(\'https://twitter.com/Zertalious\', \'_blank\')">Twitter</button>\n\t\t</div>') +
        '</div>',
        msgEl = t.querySelector('.msg'),
        infoEl = t.querySelector('.info');
      t.children.length > 0;

    )
      document.body.appendChild(t.children[0]);
    if (shouldShowAd) {
      const t = new URL(window.location.href);
      t.searchParams.set('showAd', Date.now().toString(16)),
        t.searchParams.set('scriptVersion', GM.info.script.version),
        (window.location.href =
          'https://zertalious.xyz?ref=' +
          new TextEncoder().encode(t.href).toString());
    }
  });
var Inject = window.injectScript;
setTimeout(Inject, 500);
