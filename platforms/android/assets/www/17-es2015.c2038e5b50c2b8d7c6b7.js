(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{G8VQ:function(e,t,n){"use strict";n.r(t),n.d(t,"BattleModule",(function(){return G}));var i=n("ofXK"),s=n("TEn/"),o=n("3Pt+"),r=n("oo/y"),a=n("tIkO"),c=n("tk/3"),l=n("tyNb"),b=n("mrSG"),d=n("fXoL"),u=n("z5bb"),g=n("IArL"),p=n("TFC3"),f=n("s9Uj");function h(e,t){1&e&&d.Lb(0,"img",18)}function m(e,t){if(1&e&&d.Lb(0,"img",19),2&e){const e=d.Zb(3);d.ec("src",e.imgUrl,d.pc)}}function O(e,t){if(1&e&&(d.Pb(0,"div",12),d.Pb(1,"ion-avatar",13),d.sc(2,h,1,0,"img",14),d.sc(3,m,1,1,"img",15),d.Ob(),d.Pb(4,"span",16),d.uc(5,"Vs"),d.Ob(),d.Pb(6,"ion-avatar",17),d.Lb(7,"img",18),d.Ob(),d.Ob()),2&e){const e=d.Zb(2);d.zb(2),d.ec("ngIf",""===e.imgUrl),d.zb(1),d.ec("ngIf",""!==e.imgUrl)}}function P(e,t){if(1&e&&(d.Pb(0,"div",20),d.Pb(1,"ion-text"),d.uc(2),d.Ob(),d.Ob()),2&e){const e=d.Zb(2);d.zb(2),d.vc(null==e.gameStatus?null:e.gameStatus.message)}}function v(e,t){if(1&e&&(d.Pb(0,"div",8),d.sc(1,O,8,2,"div",9),d.Pb(2,"div"),d.Lb(3,"ion-spinner",10),d.Ob(),d.sc(4,P,3,1,"div",11),d.Ob()),2&e){const e=d.Zb();d.zb(1),d.ec("ngIf",e.gameStatus),d.zb(3),d.ec("ngIf",e.gameStatus)}}function w(e,t){if(1&e&&(d.Pb(0,"ion-grid"),d.Pb(1,"ion-row"),d.Pb(2,"ion-col",21),d.Pb(3,"ion-chip",22),d.Lb(4,"img",23),d.Pb(5,"ion-label"),d.uc(6),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Ob()),2&e){const e=d.Zb();d.zb(3),d.ec("ngClass",(null==e.mainService?null:e.mainService.timeLeft)>100?"more":"danger"),d.zb(3),d.wc("",null==e.mainService?null:e.mainService.timeLeft," Sec")}}function x(e,t){if(1&e&&(d.Pb(0,"ion-col",25),d.Pb(1,"div",26),d.Pb(2,"ion-text"),d.uc(3),d.Ob(),d.Ob(),d.Pb(4,"div",27),d.Lb(5,"ion-progress-bar",28),d.Pb(6,"span",29),d.uc(7),d.Ob(),d.Ob(),d.Ob()),2&e){const e=t.$implicit,n=t.even,i=d.Zb(2);d.zb(3),d.wc(" ",i.userId==e.userId?"You":e.userdetails[0].username,""),d.zb(2),d.fc("value",e.score/(null==i.battleResponse||null==i.battleResponse.questions?null:i.battleResponse.questions.length)),d.ec("color",n?"secondary":"primary"),d.zb(2),d.wc(" ",e.score,"")}}function S(e,t){if(1&e&&(d.Pb(0,"ion-gird"),d.Pb(1,"ion-row"),d.sc(2,x,8,4,"ion-col",24),d.Ob(),d.Ob()),2&e){const e=d.Zb();d.zb(2),d.ec("ngForOf",e.battlePlayers)}}function C(e,t){if(1&e){const e=d.Qb();d.Pb(0,"div"),d.Pb(1,"app-number-cruncher-question",33),d.Xb("questionLoaded",(function(t){return d.nc(e),d.Zb(4).onQuestionLoaded(t)}))("sendAnswer",(function(t){return d.nc(e),d.Zb(4).enteredNumber(t)})),d.Ob(),d.Ob()}if(2&e){const e=d.Zb(2),t=e.$implicit,n=e.index,i=d.Zb(2);d.rc("height",i.deviceHeight,"px"),d.zb(1),d.ec("inputQuestion",i.splittingQuestion(t,n))("showOperators",i.isShowOperator)("inputClass",i.buttonValue)("enteredAnswer",i.enteredAnswer)}}function y(e,t){if(1&e){const e=d.Qb();d.Pb(0,"div"),d.Pb(1,"app-question",34),d.Xb("sendAnswer",(function(t){return d.nc(e),d.Zb(4).enteredNumber(t)})),d.Ob(),d.Ob()}if(2&e){const e=d.Zb(2),t=e.$implicit,n=e.index,i=d.Zb(2);d.rc("height",i.deviceHeight,"px"),d.zb(1),d.ec("inputQuestion",i.splittingQuestion(t,n))("showOperators",i.isShowOperator)("inputClass",i.buttonValue)("enteredAnswer",i.enteredAnswer)("operatorClass",i.operatorClassRequired)}}function z(e,t){if(1&e&&(d.Nb(0),d.sc(1,C,2,6,"div",31),d.sc(2,y,2,7,"ng-template",null,32,d.tc),d.Mb()),2&e){const e=d.mc(3),t=d.Zb().$implicit;d.zb(1),d.ec("ngIf",5===(null==t?null:t.answerType))("ngIfElse",e)}}function k(e,t){if(1&e&&(d.Nb(0),d.sc(1,z,4,2,"ng-container",6),d.Mb()),2&e){const e=t.index,n=d.Zb(2);d.zb(1),d.ec("ngIf",e===n.currentQuestion)}}function I(e,t){if(1&e&&(d.Nb(0),d.sc(1,k,2,1,"ng-container",30),d.Mb()),2&e){const e=d.Zb();d.zb(1),d.ec("ngForOf",e.battleResponse.questions)}}function M(e,t){1&e&&d.Lb(0,"img",46)}function _(e,t){if(1&e&&d.Lb(0,"img",19),2&e){const e=d.Zb().$implicit,t=d.Zb(2);d.ec("src",t.imageUrl(e),d.pc)}}const L=function(e){return{"current-user":e}};function Q(e,t){if(1&e&&(d.Pb(0,"ion-card"),d.Pb(1,"ion-row",40),d.Pb(2,"ion-col",41),d.uc(3),d.Ob(),d.Pb(4,"ion-col",42),d.Pb(5,"ion-avatar",13),d.sc(6,M,1,0,"img",43),d.sc(7,_,1,1,"img",15),d.Ob(),d.Ob(),d.Pb(8,"ion-col",44),d.uc(9),d.Ob(),d.Pb(10,"ion-col",45),d.uc(11),d.Ob(),d.Ob(),d.Ob()),2&e){const e=t.$implicit,n=t.index,i=d.Zb(2);d.zb(1),d.ec("ngClass",d.hc(6,L,i.userId==e.userId)),d.zb(2),d.vc(n+1),d.zb(3),d.ec("ngIf",""==(null==e||null==e.userdetails[0]?null:e.userdetails[0].avatar)||null==(null==e||null==e.userdetails[0]?null:e.userdetails[0].avatar)),d.zb(1),d.ec("ngIf",""!==(null==e||null==e.userdetails[0]?null:e.userdetails[0].avatar)||void 0!==(null==e||null==e.userdetails[0]?null:e.userdetails[0].avatar)),d.zb(2),d.wc(" ",e.userdetails[0].username,""),d.zb(2),d.wc(" ",e.score,"")}}function A(e,t){if(1&e&&(d.Nb(0),d.Pb(1,"ion-row",35),d.Pb(2,"ion-col",36),d.uc(3," Rank "),d.Ob(),d.Pb(4,"ion-col",37),d.uc(5," Name "),d.Ob(),d.Pb(6,"ion-col",38),d.uc(7," Score "),d.Ob(),d.Ob(),d.Pb(8,"ion-grid",39),d.sc(9,Q,12,8,"ion-card",30),d.Ob(),d.Mb()),2&e){const e=d.Zb();d.zb(9),d.ec("ngForOf",e.battlePlayers)}}function Z(e,t){if(1&e){const e=d.Qb();d.Pb(0,"ion-footer",47),d.Pb(1,"ion-grid"),d.Pb(2,"ion-row",48),d.Pb(3,"ion-col",49),d.Pb(4,"ion-fab-button",50),d.Xb("click",(function(){return d.nc(e),d.Zb().resetData()})),d.Pb(5,"ion-avatar",51),d.Lb(6,"img",52),d.Ob(),d.Ob(),d.Ob(),d.Pb(7,"ion-col",49),d.Pb(8,"ion-fab-button",53),d.Xb("click",(function(){return d.nc(e),d.Zb().skip()})),d.Pb(9,"ion-avatar",54),d.Lb(10,"img",55),d.Ob(),d.Ob(),d.Ob(),d.Pb(11,"ion-col",49),d.Pb(12,"ion-fab-button",56),d.Xb("click",(function(){return d.nc(e),d.Zb().submitQuestion()})),d.Pb(13,"ion-avatar",57),d.Lb(14,"img",58),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Ob()}if(2&e){const e=d.Zb();d.zb(8),d.ec("disabled",!e.isQuestionLoaded),d.zb(4),d.ec("disabled",!e.isQuestionLoaded)}}const R=[{path:"",component:(()=>{class e{constructor(e,t,n,i,s,o){var r,a,c,l;this.socketService=e,this.formBuilder=t,this.router=n,this.mainService=i,this.cd=s,this.platform=o,this.endGame=!1,this.gameStarted=!1,this.currentQuestion=0,this.enteredAnswer="",this.operatorClassRequired=!0,this.isQuestionLoaded=!0,this.imgUrl="",this.subscribe=this.mainService.getLeaveRoomStatus().subscribe(e=>{e&&this.gameStatus&&this.socketService.leaveGame(this.userId,this.gameStatus.gameId)}),this.questionForm=this.formBuilder.group({answer:""}),this.imgUrl=void 0!==(null===(a=null===(r=this.mainService.userData)||void 0===r?void 0:r.userDetails)||void 0===a?void 0:a.avatar)?this.socketService.BASE_URL+"/"+(null===(l=null===(c=this.mainService.userData)||void 0===c?void 0:c.userDetails)||void 0===l?void 0:l.avatar):""}ngOnInit(){this.deviceHeight=this.platform.height()-350;const e=JSON.parse(localStorage.getItem("currentUser"));e&&(this.userId=e.userId,this.userName=e.userName,this.establishSocketConnection(),this.getPlayerList())}onQuestionLoaded(e){this.isQuestionLoaded=!0}establishSocketConnection(){return Object(b.a)(this,void 0,void 0,(function*(){try{yield this.socketService.connectSocket(this.userId),this.battle()}catch(e){alert("Something went wrong")}}))}getPlayerList(){this.socketService.getPlayerList(this.userId).subscribe(e=>{this.playerList=e.playerList})}battle(){return Object(b.a)(this,void 0,void 0,(function*(){this.endGame=!1,this.gameStarted=!1,yield this.socketService.startBattle(this.userId),this.listenForStatus(),this.listenForBattle(),this.listenForScore(),this.listenForEndGame()}))}listenForBattle(){this.socketService.receiveQuestions().subscribe(e=>{this.battleResponse=e,localStorage.setItem("gameId",JSON.stringify(this.battleResponse.gameId)),this.battlePlayers=e.players,this.gameStarted=!0,this.setQuestionStatus(),this.mainService.startTimer(this.battlePlayers.interval)})}listenForStatus(){this.socketService.getBattleStatus().subscribe(e=>{this.gameStatus=e,localStorage.setItem("gameStatus",JSON.stringify(this.gameStatus))})}listenForScore(){this.socketService.getBattleScore().subscribe(e=>{this.gameScore=e,this.battlePlayers=e.players})}imageUrl(e){var t,n;return void 0!==(null===(t=null==e?void 0:e.userdetails[0])||void 0===t?void 0:t.avatar)&&this.socketService.BASE_URL+"/"+(null===(n=null==e?void 0:e.userdetails[0])||void 0===n?void 0:n.avatar)}listenForEndGame(){const e=this;this.socketService.endGame().subscribe(t=>{e.battlePlayers=this.battlePlayers.sort((e,t)=>e.score<t.score?1:t.score<e.score?-1:0),e.battleResponse=null,localStorage.removeItem("canClosePage"),e.mainService.clearTimer(),e.endGame=!0,e.cd.detectChanges(),setTimeout(()=>{e.gameStatus=void 0,e.battlePlayers=[],e.router.navigate(["home"])},3e7)})}setQuestionStatus(){5===this.battleResponse.questions[this.currentQuestion].answerType&&(this.isQuestionLoaded=!1)}submitQuestion(){this.currentQuestion++,this.setQuestionStatus(),"\xd7"===this.enteredAnswer&&(this.enteredAnswer="*"),"\xf7"===this.enteredAnswer&&(this.enteredAnswer="/"),this.socketService.updateAnswer(this.battleResponse.gameId,this.battleResponse.lobbyId,this.userId,this.battleResponse.questions[this.index].question,this.index,this.enteredAnswer,this.battleResponse.questions[this.index].answerType),this.enteredAnswer=""}skip(){this.submitQuestion()}splittingQuestion(e,t){switch(this.index=t,this.questionSplit=e.question.split(" "),e.answerType){case 2:this.isShowOperator=!0;break;default:this.isShowOperator=!1}return this.operatorClassRequired=3!==e.answerType&&4!==e.answerType,this.questionSplit}enteredNumber(e){this.enteredAnswer=e}resetData(){this.enteredAnswer=""}getAvatarUrl(e){return this.socketService.BASE_URL+"/"+e}}return e.\u0275fac=function(t){return new(t||e)(d.Kb(u.a),d.Kb(o.a),d.Kb(l.g),d.Kb(g.a),d.Kb(d.h),d.Kb(s.O))},e.\u0275cmp=d.Eb({type:e,selectors:[["app-battle"]],decls:13,vars:10,consts:[[3,"translucent"],[3,"ngClass"],["slot","start"],[1,"ion-text-center","ion-text-uppercase","math-title","title-space"],[3,"fullscreen"],["class","ion-padding-bottom waiting-player",4,"ngIf"],[4,"ngIf"],["class","box-shadow",4,"ngIf"],[1,"ion-padding-bottom","waiting-player"],["class","ion-text-center waiting-icon",4,"ngIf"],["name","dots"],["class","waiting-text",4,"ngIf"],[1,"ion-text-center","waiting-icon"],[1,"profile-img","box-shadow"],["src","../../assets/icon/profile.png","class","box-shadow",4,"ngIf"],["class","pro-dp box-shadow",3,"src",4,"ngIf"],[1,"ion-padding-horizontal","vs"],[1,"default-img","box-shadow"],["src","../../assets/icon/profile.png",1,"box-shadow"],[1,"pro-dp","box-shadow",3,"src"],[1,"waiting-text"],[1,"ion-text-center"],["outline","",1,"timer",3,"ngClass"],["src","assets/img/timer.png"],["size","6",4,"ngFor","ngForOf"],["size","6"],[1,"person-name"],[1,"ion-display-progress"],[3,"value","color"],[1,"ion-curve"],[4,"ngFor","ngForOf"],[3,"height",4,"ngIf","ngIfElse"],["all_quens",""],[3,"inputQuestion","showOperators","inputClass","enteredAnswer","questionLoaded","sendAnswer"],[3,"inputQuestion","showOperators","inputClass","enteredAnswer","operatorClass","sendAnswer"],[1,"score-titles"],["size","4"],["size","4",1,"ion-text-center"],["size","4",1,"ion-text-right"],[1,"ion-no-padding"],[1,"score-card",3,"ngClass"],["size","2",1,"score-rank","ion-text-center"],["size","2",1,"pro-dp"],["src","assets/icon/profile.png","class","default-image",4,"ngIf"],["size","6",1,"score-name"],["size","2",1,"score-pts"],["src","assets/icon/profile.png",1,"default-image"],[1,"box-shadow"],[1,"ion-justify-content-center"],["size","3"],["size","small","color","danger",1,"footer-btn","box-shadow",3,"click"],[1,"footer-grid","close"],["src","../../assets/icon/close.png"],["size","small","color","warning",1,"footer-btn","box-shadow",3,"disabled","click"],[1,"footer-grid","eraser"],["src","../../assets/icon/eraser.png"],["size","small","color","success",1,"footer-btn","box-shadow",3,"disabled","click"],[1,"footer-grid","right"],["src","../../assets/icon/right.png"]],template:function(e,t){1&e&&(d.Pb(0,"ion-header",0),d.Pb(1,"ion-toolbar",1),d.Pb(2,"ion-buttons",2),d.Lb(3,"ion-back-button"),d.Ob(),d.Pb(4,"ion-title",3),d.uc(5),d.Ob(),d.Ob(),d.Ob(),d.Pb(6,"ion-content",4),d.sc(7,v,5,2,"div",5),d.sc(8,w,7,2,"ion-grid",6),d.sc(9,S,3,1,"ion-gird",6),d.sc(10,I,2,1,"ng-container",6),d.sc(11,A,10,1,"ng-container",6),d.Ob(),d.sc(12,Z,15,2,"ion-footer",7)),2&e&&(d.ec("translucent",!0),d.zb(1),d.ec("ngClass",t.endGame&&t.battlePlayers.length?"primary-toolbar":"secondary-toolbar"),d.zb(4),d.wc(" ",t.endGame&&t.battlePlayers.length?"Score":"Battle"," "),d.zb(1),d.ec("fullscreen",!0),d.zb(1),d.ec("ngIf",!t.gameStarted),d.zb(1),d.ec("ngIf",!t.endGame&&t.battleResponse&&t.battlePlayers),d.zb(1),d.ec("ngIf",!t.endGame&&t.battleResponse&&t.battlePlayers),d.zb(1),d.ec("ngIf",!t.endGame&&t.battleResponse),d.zb(1),d.ec("ngIf",t.endGame&&t.battlePlayers.length),d.zb(1),d.ec("ngIf",!t.endGame&&t.battleResponse&&t.battlePlayers))},directives:[s.u,s.H,i.i,s.i,s.f,s.g,s.F,s.q,i.k,s.D,s.e,s.E,s.t,s.C,s.p,s.o,s.y,i.j,s.A,p.a,f.a,s.j,s.s,s.r],styles:[".waiting-text[_ngcontent-%COMP%]{text-align:center;font-size:1.2rem;color:#525252}.ion-name[_ngcontent-%COMP%], .ion-points[_ngcontent-%COMP%]{font-size:1.2rem;color:#686d70}.ion-icons[_ngcontent-%COMP%]{font-size:3rem}.number.sucess[_ngcontent-%COMP%]{background:#36a6da}.multiplayer-progress[_ngcontent-%COMP%]{padding:10px}.multiplayer-progress[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]:last-child{padding-top:10px}ion-content[_ngcontent-%COMP%]{--background:#e9eef4}.score-icon[_ngcontent-%COMP%]{font-size:2rem;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);border-radius:100%;padding:5px}.score-card[_ngcontent-%COMP%]{display:flex;align-items:center;padding:6px 0}.score-card[_ngcontent-%COMP%]   .score-rank[_ngcontent-%COMP%]{font-size:1.3rem}.score-card[_ngcontent-%COMP%]   .score-pts[_ngcontent-%COMP%]{font-size:1.2rem}.score-card[_ngcontent-%COMP%]   .score-name[_ngcontent-%COMP%]{font-size:1.1rem;padding-left:15px}.current-user[_ngcontent-%COMP%]{color:#ff9800}.score-titles[_ngcontent-%COMP%]{color:#f5f5f5;padding:15px 20px 12px;background:#4da4fc;position:-webkit-sticky;position:sticky;top:0;z-index:9}.ion-display-progress[_ngcontent-%COMP%]{display:flex;align-items:center}.ion-display-progress[_ngcontent-%COMP%]   .you[_ngcontent-%COMP%]{--background:#5bcc0c}.ion-display-progress[_ngcontent-%COMP%]   .others[_ngcontent-%COMP%]{--background:#12d9ff}.ion-display-progress[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%]{height:30px;position:relative;left:18px;border:4px solid #fff}.ion-display-progress[_ngcontent-%COMP%]   .ion-curve[_ngcontent-%COMP%]{background:#ababab;color:#fff;border-radius:18px;width:91px;text-align:right;padding:2px 11px 2px 2px}.person-name[_ngcontent-%COMP%]{padding-left:33px;padding-top:8px;font-size:1.1rem}.timer[_ngcontent-%COMP%]{border:3px solid #fff;border-radius:30px;height:40px;color:#fff;font-size:1.2rem}.timer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{padding-right:5px;width:6vw}.timer.more[_ngcontent-%COMP%]{background:#00b88f}.timer.danger[_ngcontent-%COMP%]{background:#e91e63}.d-flex[_ngcontent-%COMP%]{height:68%}.waiting-player[_ngcontent-%COMP%]{flex-direction:column;height:95%}.waiting-player[_ngcontent-%COMP%], .waiting-player[_ngcontent-%COMP%]   .waiting-icon[_ngcontent-%COMP%]{display:flex;align-items:center;place-content:center}.waiting-player[_ngcontent-%COMP%]   .waiting-icon[_ngcontent-%COMP%]{width:80%;height:200px;max-width:250px;border:6px solid #fff;border-radius:30px;background:#e9f6ff;background-image:url(battel2.c64d9942e922dd8054f7.png);background-repeat:no-repeat;background-position:50%;background-size:90%}.profile-img[_ngcontent-%COMP%]{width:16vw;height:16vw;margin:initial}.vs[_ngcontent-%COMP%]{font-size:1.5rem}.default-img[_ngcontent-%COMP%]{width:16vw;height:16vw;border:3px solid #f5f5f5}.default-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{background:#00d6fc;padding:10px}"]}),e})(),canDeactivate:[a.b]}];let q=(()=>{class e{}return e.\u0275mod=d.Ib({type:e}),e.\u0275inj=d.Hb({factory:function(t){return new(t||e)},imports:[[l.i.forChild(R)],l.i]}),e})();var F=n("PCNd");let G=(()=>{class e{}return e.\u0275mod=d.Ib({type:e}),e.\u0275inj=d.Hb({factory:function(t){return new(t||e)},providers:[r.a,a.b],imports:[[i.c,o.d,s.I,c.c,q,o.j,F.a]]}),e})()}}]);