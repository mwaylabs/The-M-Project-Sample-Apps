
/*!
 * jQuery MobiScroll v1.6
 * http://mobiscroll.com
 *
 * Copyright 2010-2011, Acid Media
 * Licensed under the MIT license.
 *
 */
(function(d){function z(L,h,G){var J=this,N=G,K,M,l,H={},I={},m=false;this.settings=N;this.values=null;this.val=null;this.temp=null;this.setDefaults=function(O){d.extend(i,O)};this.enable=function(){N.disabled=false;if(d(L).is(":input")){d(L).prop("disabled",false)}};this.scroll=function(Q,T,S,U,O){Q.attr("style",(S?(w+"-transition:all "+S.toFixed(1)+"s ease-out;"):"")+(k?(w+"-transform:translate3d(0,"+(T*y)+"px,0);"):("top:"+(T*y)+"px;")));function R(W,V,Y,X){return Y*Math.sin(W/X*(Math.PI/2))+V}if(S){var P=0;clearInterval(H[O]);H[O]=setInterval(function(){P+=0.1;Q.data("pos",Math.round(R(P,U,T-U,S)));if(P>=S){clearInterval(H[O]);Q.data("pos",T)}},100);clearTimeout(I[O]);I[O]=setTimeout(function(){if(!Q.hasClass("dwa")){Q.closest(".dwwl").find(".dwwb").fadeIn("fast")}},S*1000)}else{Q.data("pos",T)}};this.disable=function(){N.disabled=true;if(d(L).is(":input")){d(L).prop("disabled",true)}};this.formatDate=function(X,P,Q){if(!P){return null}var Y=d.extend({},this.settings,Q),V=function(Z){var aa=0;while(T+1<X.length&&X.charAt(T+1)==Z){aa++;T++}return aa},S=function(aa,ab,Z){var ac=""+ab;if(V(aa)){while(ac.length<Z){ac="0"+ac}}return ac},R=function(Z,ac,ab,aa){return(V(Z)?aa[ac]:ab[ac])},O="",W=false;for(var T=0;T<X.length;T++){if(W){if(X.charAt(T)=="'"&&!V("'")){W=false}else{O+=X.charAt(T)}}else{switch(X.charAt(T)){case"d":O+=S("d",P.getDate(),2);break;case"D":O+=R("D",P.getDay(),Y.dayNamesShort,Y.dayNames);break;case"o":O+=S("o",(P.getTime()-new Date(P.getFullYear(),0,0).getTime())/86400000,3);break;case"m":O+=S("m",P.getMonth()+1,2);break;case"M":O+=R("M",P.getMonth(),Y.monthNamesShort,Y.monthNames);break;case"y":O+=(V("y")?P.getFullYear():(P.getYear()%100<10?"0":"")+P.getYear()%100);break;case"h":var U=P.getHours();O+=S("h",(U>12?(U-12):(U==0?12:U)),2);break;case"H":O+=S("H",P.getHours(),2);break;case"i":O+=S("i",P.getMinutes(),2);break;case"s":O+=S("s",P.getSeconds(),2);break;case"a":O+=P.getHours()>11?"pm":"am";break;case"A":O+=P.getHours()>11?"PM":"AM";break;case"'":if(V("'")){O+="'"}else{W=true}break;default:O+=X.charAt(T)}}}return O};this.parseDate=function(ae,X,ag){var S=new Date();if(!ae||!X){return S}X=(typeof X=="object"?X.toString():X+"");var U=d.extend({},this.settings,ag),P=S.getFullYear(),ai=S.getMonth()+1,ac=S.getDate(),R=-1,af=S.getHours(),Y=S.getMinutes(),Q=S.getSeconds(),V=-1,ab=false,W=function(ak){var al=(O+1<ae.length&&ae.charAt(O+1)==ak);if(al){O++}return al},aj=function(al){W(al);var am=(al=="@"?14:(al=="!"?20:(al=="y"?4:(al=="o"?3:2))));var an=new RegExp("^\\d{1,"+am+"}");var ak=X.substr(ad).match(an);if(!ak){throw"Missing number at position "+ad}ad+=ak[0].length;return parseInt(ak[0],10)},T=function(al,an,ak){var ao=(W(al)?ak:an);for(var am=0;am<ao.length;am++){if(X.substr(ad,ao[am].length).toLowerCase()==ao[am].toLowerCase()){ad+=ao[am].length;return am+1}}throw"Unknown name at position "+ad},aa=function(){if(X.charAt(ad)!=ae.charAt(O)){throw"Unexpected literal at position "+ad}ad++},ad=0;for(var O=0;O<ae.length;O++){if(ab){if(ae.charAt(O)=="'"&&!W("'")){ab=false}else{aa()}}else{switch(ae.charAt(O)){case"d":ac=aj("d");break;case"D":T("D",U.dayNamesShort,U.dayNames);break;case"o":R=aj("o");break;case"m":ai=aj("m");break;case"M":ai=T("M",U.monthNamesShort,U.monthNames);break;case"y":P=aj("y");break;case"H":af=aj("H");break;case"h":af=aj("h");break;case"i":Y=aj("i");break;case"s":Q=aj("s");break;case"a":V=T("a",["am","pm"],["am","pm"])-1;break;case"A":V=T("A",["am","pm"],["am","pm"])-1;break;case"'":if(W("'")){aa()}else{ab=true}break;default:aa()}}}if(P<100){P+=new Date().getFullYear()-new Date().getFullYear()%100+(P<=U.shortYearCutoff?0:-100)}if(R>-1){ai=1;ac=R;do{var Z=32-new Date(P,ai-1,32).getDate();if(ac<=Z){break}ai++;ac-=Z}while(true)}af=(V==-1)?af:((V&&af<12)?(af+12):(!V&&af==12?0:af));var ah=new Date(P,ai-1,ac,af,Y,Q);if(ah.getFullYear()!=P||ah.getMonth()+1!=ai||ah.getDate()!=ac){throw"Invalid date"}return ah};this.setValue=function(P){if(P==undefined){P=true}var O=this.formatResult();this.val=O;this.values=this.temp.slice(0);if(P&&d(L).is(":input")){d(L).val(O).change()}};this.getDate=function(){var P=this.values;if(N.preset=="date"){return new Date(P[K],P[M],P[l])}if(N.preset=="time"){var O=(N.ampm)?((P[N.seconds?3:2]=="PM"&&(P[0]-0)<12)?(P[0]-0+12):(P[N.seconds?3:2]=="AM"&&(P[0]==12)?0:P[0])):P[0];return new Date(1970,0,1,O,P[1],N.seconds?P[2]:null)}if(N.preset=="datetime"){var O=(N.ampm)?((P[N.seconds?6:5]=="PM"&&(P[3]-0)<12)?(P[3]-0+12):(P[N.seconds?6:5]=="AM"&&(P[3]==12)?0:P[3])):P[3];return new Date(P[K],P[M],P[l],O,P[4],N.seconds?P[5]:null)}};this.setDate=function(Q,P){if(N.preset.match(/date/i)){this.temp[K]=Q.getFullYear();this.temp[M]=Q.getMonth();this.temp[l]=Q.getDate()}if(N.preset=="time"){var O=Q.getHours();this.temp[0]=(N.ampm)?(O>12?(O-12):(O==0?12:O)):O;this.temp[1]=Q.getMinutes();if(N.seconds){this.temp[2]=Q.getSeconds()}if(N.ampm){this.temp[N.seconds?3:2]=O>11?"PM":"AM"}}if(N.preset=="datetime"){var O=Q.getHours();this.temp[3]=(N.ampm)?(O>12?(O-12):(O==0?12:O)):O;this.temp[4]=Q.getMinutes();if(N.seconds){this.temp[5]=Q.getSeconds()}if(N.ampm){this.temp[N.seconds?6:5]=O>11?"PM":"AM"}}this.setValue(P)};this.parseValue=function(S){if(this.preset){var O=[];if(N.preset=="date"){try{var R=this.parseDate(N.dateFormat,S,N)}catch(Q){var R=new Date()}O[K]=R.getFullYear();O[M]=R.getMonth();O[l]=R.getDate()}else{if(N.preset=="time"){try{var R=this.parseDate(N.timeFormat,S,N)}catch(Q){var R=new Date()}var P=R.getHours();O[0]=(N.ampm)?(P>12?(P-12):(P==0?12:P)):P;O[1]=R.getMinutes();if(N.seconds){O[2]=R.getSeconds()}if(N.ampm){O[N.seconds?3:2]=P>11?"PM":"AM"}}else{if(N.preset=="datetime"){try{var R=this.parseDate(N.dateFormat+" "+N.timeFormat,S,N)}catch(Q){var R=new Date()}var P=R.getHours();O[K]=R.getFullYear();O[M]=R.getMonth();O[l]=R.getDate();O[3]=(N.ampm)?(P>12?(P-12):(P==0?12:P)):P;O[4]=R.getMinutes();if(N.seconds){O[5]=R.getSeconds()}if(N.ampm){O[N.seconds?6:5]=P>11?"PM":"AM"}}}}return O}return N.parseValue(S,this)};this.formatResult=function(){var P=this.temp;if(this.preset){if(N.preset=="date"){return this.formatDate(N.dateFormat,new Date(P[K],P[M],P[l]),N)}else{if(N.preset=="datetime"){var O=(N.ampm)?((P[N.seconds?6:5]=="PM"&&(P[3]-0)<12)?(P[3]-0+12):(P[N.seconds?6:5]=="AM"&&(P[3]==12)?0:P[3])):P[3];return this.formatDate(N.dateFormat+" "+N.timeFormat,new Date(P[K],P[M],P[l],O,P[4],N.seconds?P[5]:null),N)}else{if(N.preset=="time"){var O=(N.ampm)?((P[N.seconds?3:2]=="PM"&&(P[0]-0)<12)?(P[0]-0+12):(P[N.seconds?3:2]=="AM"&&(P[0]==12)?0:P[0])):P[0];return this.formatDate(N.timeFormat,new Date(1970,0,1,O,P[1],N.seconds?P[2]:null),N)}}}}return N.formatResult(P)};this.validate=function(P){if(this.preset&&N.preset.match(/date/i)&&((P==K)||(P==M)||(P==-1))){var Q=32-new Date(this.temp[K],this.temp[M],32).getDate()-1;var O=d("ul:eq("+l+")",h);d("li",O).show();d("li:gt("+Q+")",O).hide();if(this.temp[l]>Q){this.scroll(O,s-Q-1);this.temp[l]=d("li:eq("+Q+")",O).data("val")}}else{N.validate(P)}};this.hide=function(){if(N.onClose(this.val,this)===false){return false}d(".dwtd").prop("disabled",false).removeClass("dwtd");d(L).blur();h.hide();n.hide();m=false;if(this.preset){N.wheels=null}d(window).unbind("resize.dw")};this.show=function(){if(N.disabled||m){return false}N.beforeShow(L,this);y=N.height;s=Math.round(N.rows/2);a=this;this.init();if(this.preset){N.wheels=new Array();if(N.preset.match(/date/i)){var O={};for(var Q=0;Q<3;Q++){if(Q==K){O[N.yearText]={};for(var T=N.startYear;T<=N.endYear;T++){O[N.yearText][T]=N.dateOrder.search(/yy/i)<0?T.toString().substr(2,2):T.toString()}}else{if(Q==M){O[N.monthText]={};for(var T=0;T<12;T++){O[N.monthText][T]=(N.dateOrder.search(/MM/)<0?(N.dateOrder.search(/M/)<0?(N.dateOrder.search(/mm/)<0?(T+1):(T<9)?("0"+(T+1)):(T+1)):N.monthNamesShort[T]):N.monthNames[T])}}else{if(Q==l){O[N.dayText]={};for(var T=1;T<32;T++){O[N.dayText][T]=N.dateOrder.search(/dd/i)<0?T:(T<10)?("0"+T):T}}}}}N.wheels.push(O)}if(N.preset.match(/time/i)){N.stepHour=(N.stepHour<1)?1:parseInt(N.stepHour);N.stepMinute=(N.stepMinute<1)?1:parseInt(N.stepMinute);N.stepSecond=(N.stepSecond<1)?1:parseInt(N.stepSecond);var O={};O[N.hourText]={};for(var T=(N.ampm?1:0);T<(N.ampm?13:24);T+=N.stepHour){O[N.hourText][T]=(T<10)?("0"+T):T}O[N.minuteText]={};for(var T=0;T<60;T+=N.stepMinute){O[N.minuteText][T]=(T<10)?("0"+T):T}if(N.seconds){O[N.secText]={};for(var T=0;T<60;T+=N.stepSecond){O[N.secText][T]=(T<10)?("0"+T):T}}if(N.ampm){O[N.ampmText]={};O[N.ampmText]["AM"]="AM";O[N.ampmText]["PM"]="PM"}N.wheels.push(O)}}d(".dwc",h).remove();for(var T=0;T<N.wheels.length;T++){var P=d('<div class="dwc'+(N.mode!="scroller"?" dwpm":"")+(N.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><div class="clear" style="clear:both;"></div></div>').insertBefore(d(".dwbc",h));for(var S in N.wheels[T]){var U=d(".dwwc .clear",P);var O=d('<div class="dwwl dwrc">'+(N.mode!="scroller"?'<div class="dwwb dwwbp">+</div><div class="dwwb dwwbm">&ndash;</div>':"")+'<div class="dwl">'+S+'</div><div class="dww dwrc"><ul></ul><div class="dwwo"></div></div><div class="dwwol"></div></div>').insertBefore(U);for(var R in N.wheels[T][S]){d('<li class="val_'+R+'">'+N.wheels[T][S][R]+"</li>").data("val",R).appendTo(d("ul",O))}}}d(".dww ul",h).each(function(W){var V=d("li",this).index(d("li.val_"+J.temp[W],this));while((V<0)&&(--J.temp[W]>=0)){V=d("li",this).index(d("li.val_"+J.temp[W],this))}J.scroll(d(this),s-(V<0?0:V)-1)});if(N.showValue){d(".dwv",h).html(this.formatResult()).show()}else{d(".dwv",h).hide()}J.validate(-1);d("#dw_set",h).text(N.setText).unbind().bind("click",function(V){J.setValue();N.onSelect(J.val,a);J.hide();return false});d("#dw_cancel",h).text(N.cancelText).unbind().bind("click",function(V){N.onCancel(J.val,a);J.hide();return false});d(":input:not(:disabled)").addClass("dwtd");d(":input").prop("disabled",true);n.show();h.attr("class","dw "+N.theme).show();m=true;d(".dww, .dwwl",h).height(N.rows*y);d(".dww",h).each(function(){d(this).width(d(this).parent().width()<N.width?N.width:d(this).parent().width())});d(".dwbc a",h).attr("class",N.btnClass);d(".dww li, .dwwb",h).css({height:y,lineHeight:y+"px"});d(".dwwc",h).each(function(){var V=0;d(".dwwl",this).each(function(){V+=d(this).outerWidth(true)});d(this).width(V)});d(".dwc",h).each(function(){d(this).width(d(".dwwc",this).outerWidth(true))});this.pos();d(window).bind("resize.dw",function(){J.pos()})};this.pos=function(){var O=0,R=0,U=d(window).width(),Q=d(window).height(),S=d(window).scrollTop(),P,T;d(".dwc",h).each(function(){P=d(this).outerWidth(true);O+=P;R=(P>R)?P:R});P=O>U?R:O;h.width(P);P=h.outerWidth();T=h.outerHeight();h.css({left:(U-P)/2,top:S+(Q-T)/2});n.height(0);n.height(d(document).height())};this.init=function(){var O=N.dateOrder.search(/y/i),P=N.dateOrder.search(/m/i),Q=N.dateOrder.search(/d/i);K=O<P?(O<Q?0:1):(O<Q?1:2);M=P<O?(P<Q?0:1):(P<Q?1:2);l=Q<O?(Q<P?0:1):(Q<P?1:2);this.preset=(N.wheels===null);this.temp=((d(L).is("input")&&this.val!==null&&this.val!=d(L).val())||this.values===null)?this.parseValue(d(L).val()?d(L).val():""):this.values.slice(0);this.setValue(false)};this.init();if(d(L).is(":input")&&N.showOnFocus){d(L).data("dwro",d(L).prop("readonly")).prop("readonly",true)}d(L).addClass("scroller").unbind("focus.dw").bind("focus.dw",function(O){if(N.showOnFocus){J.show()}})}function F(l){for(var h in l){if(D[l[h]]!==undefined){return true}}return false}function b(){var h=["Webkit","Moz","O","ms"];for(var l in h){if(F([h[l]+"Transform"])){return"-"+h[l].toLowerCase()}}return""}var o,n,y,s,u,a,j={},C=new Date(),x=C.getTime(),r=false,E=null,e,t,p,c,f,D=document.createElement(D).style,k=F(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective" in document.documentElement.style,w=b(),g=("ontouchstart" in window),v=g?"touchstart":"mousedown",B=g?"touchmove":"mousemove",q=g?"touchend":"mouseup",i={width:80,height:40,rows:3,disabled:false,showOnFocus:true,showValue:true,showLabel:true,wheels:null,theme:"",mode:"scroller",preset:"date",dateFormat:"mm/dd/yy",dateOrder:"mmddy",ampm:true,seconds:false,timeFormat:"hh:ii A",startYear:C.getFullYear()-100,endYear:C.getFullYear()+1,monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",setText:"Set",cancelText:"Cancel",btnClass:"dwb",stepHour:1,stepMinute:1,stepSecond:1,beforeShow:function(){},onClose:function(){},onSelect:function(){},onCancel:function(){},formatResult:function(m){var h="";for(var l=0;l<m.length;l++){h+=(l>0?" ":"")+m[l]}return h},parseValue:function(L,K){var m=K.settings.wheels,L=L.split(" "),I=[],H=0;for(var J=0;J<m.length;J++){for(var h in m[J]){if(m[J][h][L[H]]!==undefined){I.push(L[H])}else{for(var G in m[J][h]){I.push(G);break}}H++}}return I},validate:function(){return true}},A={init:function(L){if(L===undefined){L={}}var H={};switch(L.theme){case"ios":H.dateOrder="MMdyy";H.rows=5;H.height=30;H.width=55;H.showValue=false;H.showLabel=false;break;case"android":H.dateOrder="Mddyy";break;case"android-ics":case"android-ics light":H.dateOrder="Mddyy";H.rows=5;H.width=70;H.showLabel=false;H.mode="mixed";break}if(L.mode=="clickpick"){H.height=50;H.rows=3}var l=d.extend({},i,H,L),h=false,J=false;if(d(".dw").length){n=d(".dwo");o=d(".dw")}else{n=d('<div class="dwo"></div>').hide().appendTo("body");o=d('<div class="dw"><div class="dwv">&nbsp;</div><div class="dwbc" style="clear:both;"><span class="dwbw dwb-s"><a id="dw_set" href="#"></a></span><span class="dwbw dwb-c"><a id="dw_cancel" href="#"></a></span></div></div>');o.hide().appendTo("body");function K(M){return g?M.originalEvent.changedTouches[0].pageY:M.pageY}function G(N,P,O,Q){var M=d("ul",o).index(N);P=P>(s-1)?(s-1):P;P=P<(s-u)?(s-u):P;a.scroll(N,P,O?(P==Q?0.1:Math.abs((P-Q)*0.1)):0,Q,M);a.temp[M]=d("li:eq("+(s-1-P)+")",N).data("val");a.validate(M);d(".dwv",o).html(a.formatResult())}function I(M){if(h){var N=M.data("pos"),O=N-1;O=O<(s-u)?(s-1):O;G(M,O)}else{clearInterval(h)}}function m(M){if(J){var N=M.data("pos"),O=N+1;O=O>(s-1)?(s-u):O;G(M,O)}else{clearInterval(J)}}d(document).bind(B,function(M){if(r){M.preventDefault();t=K(M);var N=f+(t-e)/y;N=N>(s-1+1)?(s-1+1):N;N=N<(s-u-1)?(s-u-1):N;a.scroll(E,N)}});d(document).bind(q,function(O){if(r){O.preventDefault();E.removeClass("dwa");var N=new Date()-p,Q=f+(t-e)/y;Q=Q>(s-1+1)?(s-1+1):Q;Q=Q<(s-u-1)?(s-u-1):Q;if(N<300){var M=(t-e)/N;var P=(M*M)/(2*0.0006);if(t-e<0){P=-P}}else{var P=t-e}G(E,Math.round(f+P/y),true,Math.round(Q));r=false;E=null}clearInterval(h);clearInterval(J);h=false;J=false;d(".dwb-a").removeClass("dwb-a")});o.delegate(".dwwl","DOMMouseScroll mousewheel",function(O){O.preventDefault();O=O.originalEvent;var Q=O.wheelDelta?(O.wheelDelta/120):(O.detail?(-O.detail/3):0),M=d("ul",this),N=M.data("pos"),P=Math.round(N+Q);u=d("li:visible",M).length;G(M,P)}).delegate(".dwb, .dwwb",v,function(M){d(this).addClass("dwb-a")}).delegate(".dwwbp",v,function(N){N.preventDefault();N.stopPropagation();var M=d(this).closest(".dwwl").find("ul");u=d("li:visible",M).length;clearInterval(h);h=setInterval(function(){I(M)},300);I(M)}).delegate(".dwwbm",v,function(N){N.preventDefault();N.stopPropagation();var M=d(this).closest(".dwwl").find("ul");u=d("li:visible",M).length;clearInterval(J);J=setInterval(function(){m(M)},300);m(M)}).delegate(".dwwl",v,function(M){if(!r&&a.settings.mode!="clickpick"){M.preventDefault();r=true;E=d("ul",this).addClass("dwa");d(".dwwb",this).fadeOut("fast");f=E.data("pos");u=d("li:visible",E).length;e=K(M);p=new Date();t=e;a.scroll(E,f)}})}return this.each(function(){if(!this.id){x+=1;this.id="scoller"+x}j[this.id]=new z(this,o,l)})},enable:function(){return this.each(function(){if(j[this.id]){j[this.id].enable()}})},disable:function(){return this.each(function(){if(j[this.id]){j[this.id].disable()}})},isDisabled:function(){if(j[this[0].id]){return j[this[0].id].settings.disabled}},option:function(h,l){return this.each(function(){if(j[this.id]){if(typeof h==="object"){d.extend(j[this.id].settings,h)}else{j[this.id].settings[h]=l}j[this.id].init()}})},setValue:function(l,h){if(h==undefined){h=false}return this.each(function(){if(j[this.id]){j[this.id].temp=l;j[this.id].setValue(l,h)}})},getValue:function(){if(j[this[0].id]){return j[this[0].id].values}},setDate:function(l,h){if(h==undefined){h=false}return this.each(function(){if(j[this.id]){j[this.id].setDate(l,h)}})},getDate:function(){if(j[this[0].id]){return j[this[0].id].getDate()}},show:function(){if(j[this[0].id]){return j[this[0].id].show()}},hide:function(){return this.each(function(){if(j[this.id]){j[this.id].hide()}})},destroy:function(){return this.each(function(){if(j[this.id]){d(this).unbind("focus.dw").removeClass("scroller");if(d(this).is(":input")){d(this).prop("readonly",d(this).data("dwro"))}delete j[this.id]}})}};d.fn.scroller=function(h){if(A[h]){return A[h].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof h==="object"||!h){return A.init.apply(this,arguments)}else{d.error("Unknown method")}}};d.scroller=new z(null,null,i)})(jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*
* jQuery Mobile Framework : scrollview plugin
* Copyright (c) 2010 Adobe Systems Incorporated - Kin Blas (jblas@adobe.com)
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt) licenses.
* Note: Code is in draft form and is subject to change 
*/
(function($,window,document,undefined){

jQuery.widget( "mobile.scrollview", jQuery.mobile.widget, {
	options: {
		fps:               60,    // Frames per second in msecs.
		direction:         null,  // "x", "y", or null for both.
	
		scrollDuration:    2000,  // Duration of the scrolling animation in msecs.
		overshootDuration: 250,   // Duration of the overshoot animation in msecs.
		snapbackDuration:  500,   // Duration of the snapback animation in msecs.
	
		moveThreshold:     10,   // User must move this many pixels in any direction to trigger a scroll.
		moveIntervalThreshold:     150,   // Time between mousemoves must not exceed this threshold.
	
		scrollMethod:      "translate",  // "translate", "position", "scroll"
	
		startEventName:    "scrollstart",
		updateEventName:   "scrollupdate",
		stopEventName:     "scrollstop",
	
		eventType:         $.support.touch ? "touch" : "mouse",
	
		showScrollBars:    true,
		
		pagingEnabled:     false,
		delayedClickSelector: "a,input,textarea,select,button,.ui-btn",
		delayedClickEnabled: true
	},

	_makePositioned: function($ele)
	{
		if ($ele.css("position") == "static")
			$ele.css("position", "relative");
	},

	_create: function()
	{ 
		this._$clip = $(this.element).addClass("ui-scrollview-clip");
		var $child = this._$clip.children();
		if ($child.length > 1) {
			$child = this._$clip.wrapInner("<div></div>").children();
		}
		this._$view = $child.addClass("ui-scrollview-view");

		this._$clip.css("overflow", this.options.scrollMethod === "scroll" ? "scroll" : "hidden");
		this._makePositioned(this._$clip);

		this._$view.css("overflow", "hidden");

		// Turn off our faux scrollbars if we are using native scrolling
		// to position the view.

		this.options.showScrollBars = this.options.scrollMethod === "scroll" ? false : this.options.showScrollBars;

		// We really don't need this if we are using a translate transformation
		// for scrolling. We set it just in case the user wants to switch methods
		// on the fly.

		this._makePositioned(this._$view);
		this._$view.css({ left: 0, top: 0 });

		this._sx = 0;
		this._sy = 0;
	
		var direction = this.options.direction;
		this._hTracker = (direction !== "y")   ? new MomentumTracker(this.options) : null;
		this._vTracker = (direction !== "x") ? new MomentumTracker(this.options) : null;
	
		this._timerInterval = 1000/this.options.fps;
		this._timerID = 0;
	
		var self = this;
		this._timerCB = function(){ self._handleMomentumScroll(); };
	
		this._addBehaviors();
	},

	_startMScroll: function(speedX, speedY)
	{
		this._stopMScroll();
		this._showScrollBars();

		var keepGoing = false;
		var duration = this.options.scrollDuration;

		this._$clip.trigger(this.options.startEventName);

		var ht = this._hTracker;
		if (ht)
		{
			var c = this._$clip.width();
			var v = this._$view.width();
			ht.start(this._sx, speedX, duration, (v > c) ? -(v - c) : 0, 0);
			keepGoing = !ht.done();
		}

		var vt = this._vTracker;
		if (vt)
		{
			var c = this._$clip.height();
			var v = this._$view.height();
			vt.start(this._sy, speedY, duration, (v > c) ? -(v - c) : 0, 0);
			keepGoing = keepGoing || !vt.done();
		}

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);
		else
			this._stopMScroll();
	},

	_stopMScroll: function()
	{
		if (this._timerID)
		{
			this._$clip.trigger(this.options.stopEventName);
			clearTimeout(this._timerID);
		}
		this._timerID = 0;

		if (this._vTracker)
			this._vTracker.reset();

		if (this._hTracker)
			this._hTracker.reset();

		this._hideScrollBars();
	},

	_handleMomentumScroll: function()
	{
		var keepGoing = false;
		var v = this._$view;

		var x = 0, y = 0;

		var vt = this._vTracker;
		if (vt)
		{
			vt.update();
			y = vt.getPosition();
			keepGoing = !vt.done();
		}

		var ht = this._hTracker;
		if (ht)
		{
			ht.update();
			x = ht.getPosition();
			keepGoing = keepGoing || !ht.done();
		}

		this._setScrollPosition(x, y);
		this._$clip.trigger(this.options.updateEventName, { x: x, y: y });

		if (keepGoing)
			this._timerID = setTimeout(this._timerCB, this._timerInterval);	
		else
			this._stopMScroll();
	},

	_setScrollPosition: function(x, y)
	{
		this._sx = x;
		this._sy = y;

		var $v = this._$view;

		var sm = this.options.scrollMethod;

		switch (sm)
		{
			case "translate":
				setElementTransform($v, x + "px", y + "px");
				break;
			case "position":
				$v.css({left: x + "px", top: y + "px"});
				break;
			case "scroll":
				var c = this._$clip[0];
				c.scrollLeft = -x;
				c.scrollTop = -y;
				break;
		}

		var $vsb = this._$vScrollBar;
		var $hsb = this._$hScrollBar;

		if ($vsb)
		{
			var $sbt = $vsb.find(".ui-scrollbar-thumb");
			if (sm === "translate")
				setElementTransform($sbt, "0px", -y/$v.height() * $sbt.parent().height() + "px");
			else
				$sbt.css("top", -y/$v.height()*100 + "%");
		}

		if ($hsb)
		{
			var $sbt = $hsb.find(".ui-scrollbar-thumb");
			if (sm === "translate")
				setElementTransform($sbt,  -x/$v.width() * $sbt.parent().width() + "px", "0px");
			else
				$sbt.css("left", -x/$v.width()*100 + "%");
		}
	},

	scrollTo: function(x, y, duration)
	{
		this._stopMScroll();
		if (!duration)
			return this._setScrollPosition(x, y);

		x = -x;
		y = -y;

		var self = this;
		var start = getCurrentTime();
		var efunc = $.easing["easeOutQuad"];
		var sx = this._sx;
		var sy = this._sy;
		var dx = x - sx;
		var dy = y - sy;
		var tfunc = function(){
			var elapsed = getCurrentTime() - start;
			if (elapsed >= duration)
			{
				self._timerID = 0;
				self._setScrollPosition(x, y);
			}
			else
			{
				var ec = efunc(elapsed/duration, elapsed, 0, 1, duration);
				self._setScrollPosition(sx + (dx * ec), sy + (dy * ec));
				self._timerID = setTimeout(tfunc, self._timerInterval);
			}
		};

		this._timerID = setTimeout(tfunc, this._timerInterval);
	},

	getScrollPosition: function()
	{
		return { x: -this._sx, y: -this._sy };
	},

	_getScrollHierarchy: function()
	{
		var svh = [];
		this._$clip.parents(".ui-scrollview-clip").each(function(){
			var d = $(this).data("scrollview");
			if (d) svh.unshift(d);
		});
		return svh;
	},

	_getAncestorByDirection: function(dir)
	{
		var svh = this._getScrollHierarchy();
		var n = svh.length;
		while (0 < n--)
		{
			var sv = svh[n];
			var svdir = sv.options.direction;

			if (!svdir || svdir == dir)
				return sv;
		}
		return null;
	},

	_handleDragStart: function(e, ex, ey)
	{
		// Stop any scrolling of elements in our parent hierarcy.
		$.each(this._getScrollHierarchy(),function(i,sv){ sv._stopMScroll(); });
		this._stopMScroll();

		var c = this._$clip;
		var v = this._$view;

		if (this.options.delayedClickEnabled) {
			this._$clickEle = $(e.target).closest(this.options.delayedClickSelector);
		}
		this._lastX = ex;
		this._lastY = ey;
		this._doSnapBackX = false;
		this._doSnapBackY = false;
		this._speedX = 0;
		this._speedY = 0;
		this._directionLock = "";
		this._didDrag = false;

		if (this._hTracker)
		{
			var cw = parseInt(c.css("width"), 10);
			var vw = parseInt(v.css("width"), 10);
			this._maxX = cw - vw;
			if (this._maxX > 0) this._maxX = 0;
			if (this._$hScrollBar)
				this._$hScrollBar.find(".ui-scrollbar-thumb").css("width", (cw >= vw ? "100%" : Math.floor(cw/vw*100)+ "%"));
		}

		if (this._vTracker)
		{
			var ch = parseInt(c.css("height"), 10);
			var vh = parseInt(v.css("height"), 10);
			this._maxY = ch - vh;
			if (this._maxY > 0) this._maxY = 0;
			if (this._$vScrollBar)
				this._$vScrollBar.find(".ui-scrollbar-thumb").css("height", (ch >= vh ? "100%" : Math.floor(ch/vh*100)+ "%"));
		}

		var svdir = this.options.direction;

		this._pageDelta = 0;
		this._pageSize = 0;
		this._pagePos = 0; 

		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y"))
		{
			this._pageSize = svdir === "x" ? cw : ch;
			this._pagePos = svdir === "x" ? this._sx : this._sy;
			this._pagePos -= this._pagePos % this._pageSize;
		}
		this._lastMove = 0;
		this._enableTracking();

		// If we're using mouse events, we need to prevent the default
		// behavior to suppress accidental selection of text, etc. We
		// can't do this on touch devices because it will disable the
		// generation of "click" events.
		//
		// XXX: We should test if this has an effect on links! - kin

		if (this.options.eventType == "mouse" || this.options.delayedClickEnabled)
			e.preventDefault();
		e.stopPropagation();
	},

	_propagateDragMove: function(sv, e, ex, ey, dir)
	{
		this._hideScrollBars();
		this._disableTracking();
		sv._handleDragStart(e,ex,ey);
		sv._directionLock = dir;
		sv._didDrag = this._didDrag;
	},

	_handleDragMove: function(e, ex, ey)
	{
		this._lastMove = getCurrentTime();

		var v = this._$view;

		var dx = ex - this._lastX;
		var dy = ey - this._lastY;
		var svdir = this.options.direction;

		if (!this._directionLock)
		{
			var x = Math.abs(dx);
			var y = Math.abs(dy);
			var mt = this.options.moveThreshold;

			if (x < mt && y < mt) {
				return false;
			}

			var dir = null;
			var r = 0;
			if (x < y && (x/y) < 0.5) {
				dir = "y";
			}
			else if (x > y && (y/x) < 0.5) {
				dir = "x";
			}

			if (svdir && dir && svdir != dir)
			{
				// This scrollview can't handle the direction the user
				// is attempting to scroll. Find an ancestor scrollview
				// that can handle the request.

				var sv = this._getAncestorByDirection(dir);
				if (sv)
				{
					this._propagateDragMove(sv, e, ex, ey, dir);
					return false;
				}
			}

			this._directionLock = svdir ? svdir : (dir ? dir : "none");
		}

		var newX = this._sx;
		var newY = this._sy;

		if (this._directionLock !== "y" && this._hTracker)
		{
			var x = this._sx;
			this._speedX = dx;
			newX = x + dx;

			// Simulate resistance.

			this._doSnapBackX = false;
			if (newX > 0 || newX < this._maxX)
			{
				if (this._directionLock === "x")
				{
					var sv = this._getAncestorByDirection("x");
					if (sv)
					{
						this._setScrollPosition(newX > 0 ? 0 : this._maxX, newY);
						this._propagateDragMove(sv, e, ex, ey, dir);
						return false;
					}
				}
				newX = x + (dx/2);
				this._doSnapBackX = true;
			}
		}

		if (this._directionLock !== "x" && this._vTracker)
		{
			var y = this._sy;
			this._speedY = dy;
			newY = y + dy;

			// Simulate resistance.

			this._doSnapBackY = false;
			if (newY > 0 || newY < this._maxY)
			{
				if (this._directionLock === "y")
				{
					var sv = this._getAncestorByDirection("y");
					if (sv)
					{
						this._setScrollPosition(newX, newY > 0 ? 0 : this._maxY);
						this._propagateDragMove(sv, e, ex, ey, dir);
						return false;
					}
				}

				newY = y + (dy/2);
				this._doSnapBackY = true;
			}

		}

		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y"))
		{
			if (this._doSnapBackX || this._doSnapBackY)
				this._pageDelta = 0;
			else
			{
				var opos = this._pagePos;
				var cpos = svdir === "x" ? newX : newY;
				var delta = svdir === "x" ? dx : dy;

				this._pageDelta = (opos > cpos && delta < 0) ? this._pageSize : ((opos < cpos && delta > 0) ? -this._pageSize : 0);
			}
		}

		this._didDrag = true;
		this._lastX = ex;
		this._lastY = ey;

		this._setScrollPosition(newX, newY);

		this._showScrollBars();

		// Call preventDefault() to prevent touch devices from
		// scrolling the main window.

		// e.preventDefault();
		
		return false;
	},

	_handleDragStop: function(e)
	{
		var l = this._lastMove;
		var t = getCurrentTime();
		var doScroll = l && (t - l) <= this.options.moveIntervalThreshold;

		var sx = (this._hTracker && this._speedX && doScroll) ? this._speedX : (this._doSnapBackX ? 1 : 0);
		var sy = (this._vTracker && this._speedY && doScroll) ? this._speedY : (this._doSnapBackY ? 1 : 0);

		var svdir = this.options.direction;
		if (this.options.pagingEnabled && (svdir === "x" || svdir === "y") && !this._doSnapBackX && !this._doSnapBackY)
		{
			var x = this._sx;
			var y = this._sy;
			if (svdir === "x")
				x = -this._pagePos + this._pageDelta;
			else
				y = -this._pagePos + this._pageDelta;

			this.scrollTo(x, y, this.options.snapbackDuration);
		}
		else if (sx || sy)
			this._startMScroll(sx, sy);
		else
			this._hideScrollBars();

		this._disableTracking();

		if (!this._didDrag && this.options.delayedClickEnabled && this._$clickEle.length) {
			this._$clickEle
//				.trigger("mousedown")
				//.trigger("focus")
//				.trigger("mouseup")
				.trigger("tap");
		}

		// If a view scrolled, then we need to absorb
		// the event so that links etc, underneath our
		// cursor/finger don't fire.

		return this._didDrag ? false : undefined;
	},

	_enableTracking: function()
	{
		$(document).bind(this._dragMoveEvt, this._dragMoveCB);
		$(document).bind(this._dragStopEvt, this._dragStopCB);
	},

	_disableTracking: function()
	{
		$(document).unbind(this._dragMoveEvt, this._dragMoveCB);
		$(document).unbind(this._dragStopEvt, this._dragStopCB);
	},

	_showScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.addClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.addClass(vclass);
	},

	_hideScrollBars: function()
	{
		var vclass = "ui-scrollbar-visible";
		if (this._$vScrollBar) this._$vScrollBar.removeClass(vclass);
		if (this._$hScrollBar) this._$hScrollBar.removeClass(vclass);
	},

	_addBehaviors: function()
	{
		var self = this;
		if (this.options.eventType === "mouse")
		{
			this._dragStartEvt = "mousedown";
			this._dragStartCB = function(e){ return self._handleDragStart(e, e.clientX, e.clientY); };

			this._dragMoveEvt = "mousemove";
			this._dragMoveCB = function(e){ return self._handleDragMove(e, e.clientX, e.clientY); };

			this._dragStopEvt = "mouseup";
			this._dragStopCB = function(e){ return self._handleDragStop(e); };
		}
		else // "touch"
		{
			this._dragStartEvt = "touchstart";
			this._dragStartCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleDragStart(e, t.pageX, t.pageY);
			};

			this._dragMoveEvt = "touchmove";
			this._dragMoveCB = function(e)
			{
				var t = e.originalEvent.targetTouches[0];
				return self._handleDragMove(e, t.pageX, t.pageY);
			};

			this._dragStopEvt = "touchend";
			this._dragStopCB = function(e){ return self._handleDragStop(e); };
		}

		this._$view.bind(this._dragStartEvt, this._dragStartCB);

		if (this.options.showScrollBars)
		{
			var $c = this._$clip;
			var prefix = "<div class=\"ui-scrollbar ui-scrollbar-";
			var suffix = "\"><div class=\"ui-scrollbar-track\"><div class=\"ui-scrollbar-thumb\"></div></div></div>";
			if (this._vTracker)
			{
				$c.append(prefix + "y" + suffix);
				this._$vScrollBar = $c.children(".ui-scrollbar-y");
			}
			if (this._hTracker)
			{
				$c.append(prefix + "x" + suffix);
				this._$hScrollBar = $c.children(".ui-scrollbar-x");
			}
		}
	}
});

function setElementTransform($ele, x, y)
{
	var v = "translate3d(" + x + "," + y + ", 0px)";
	$ele.css({
		"-moz-transform": v,
		"-webkit-transform": v,
		"transform": v
	});
}


function MomentumTracker(options)
{
	this.options = $.extend({}, options);
	this.easing = "easeOutQuad";
	this.reset();
}

var tstates = {
	scrolling: 0,
	overshot:  1,
	snapback:  2,
	done:      3
};

function getCurrentTime() { return (new Date()).getTime(); }

$.extend(MomentumTracker.prototype, {
	start: function(pos, speed, duration, minPos, maxPos)
	{
		this.state = (speed != 0) ? ((pos < minPos || pos > maxPos) ? tstates.snapback : tstates.scrolling) : tstates.done;
		this.pos = pos;
		this.speed = speed;
		this.duration = (this.state == tstates.snapback) ? this.options.snapbackDuration : duration;
		this.minPos = minPos;
		this.maxPos = maxPos;

		this.fromPos = (this.state == tstates.snapback) ? this.pos : 0;
		this.toPos = (this.state == tstates.snapback) ? ((this.pos < this.minPos) ? this.minPos : this.maxPos) : 0;

		this.startTime = getCurrentTime();
	},

	reset: function()
	{
		this.state = tstates.done;
		this.pos = 0;
		this.speed = 0;
		this.minPos = 0;
		this.maxPos = 0;
		this.duration = 0;
	},

	update: function()
	{
		var state = this.state;
		if (state == tstates.done)
			return this.pos;

		var duration = this.duration;
		var elapsed = getCurrentTime() - this.startTime;
		elapsed = elapsed > duration ? duration : elapsed;

		if (state == tstates.scrolling || state == tstates.overshot)
		{
			var dx = this.speed * (1 - $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
	
			var x = this.pos + dx;
	
			var didOverShoot = (state == tstates.scrolling) && (x < this.minPos || x > this.maxPos);
			if (didOverShoot)
				x = (x < this.minPos) ? this.minPos : this.maxPos;
		
			this.pos = x;
	
			if (state == tstates.overshot)
			{
				if (elapsed >= duration)
				{
					this.state = tstates.snapback;
					this.fromPos = this.pos;
					this.toPos = (x < this.minPos) ? this.minPos : this.maxPos;
					this.duration = this.options.snapbackDuration;
					this.startTime = getCurrentTime();
					elapsed = 0;
				}
			}
			else if (state == tstates.scrolling)
			{
				if (didOverShoot)
				{
					this.state = tstates.overshot;
					this.speed = dx / 2;
					this.duration = this.options.overshootDuration;
					this.startTime = getCurrentTime();
				}
				else if (elapsed >= duration)
					this.state = tstates.done;
			}
		}
		else if (state == tstates.snapback)
		{
			if (elapsed >= duration)
			{
				this.pos = this.toPos;
				this.state = tstates.done;		
			}
			else
				this.pos = this.fromPos + ((this.toPos - this.fromPos) * $.easing[this.easing](elapsed/duration, elapsed, 0, 1, duration));
		}

		return this.pos;
	},

	done: function() { return this.state == tstates.done; },
	getPosition: function(){ return this.pos; }
});

jQuery.widget( "mobile.scrolllistview", jQuery.mobile.scrollview, {
	options: {
		direction: "y"
	},

	_create: function() {
		$.mobile.scrollview.prototype._create.call(this);
	
		// Cache the dividers so we don't have to search for them everytime the
		// view is scrolled.
		//
		// XXX: Note that we need to update this cache if we ever support lists
		//      that can dynamically update their content.
	
		this._$dividers = this._$view.find("[data-role=list-divider]");
		this._lastDivider = null;
	},

	_setScrollPosition: function(x, y)
	{
		// Let the view scroll like it normally does.
	
		$.mobile.scrollview.prototype._setScrollPosition.call(this, x, y);

		y = -y;

		// Find the dividers for the list.

		var $divs = this._$dividers;
		var cnt = $divs.length;
		var d = null;
		var dy = 0;
		var nd = null;

		for (var i = 0; i < cnt; i++)
		{
			nd = $divs.get(i);
			var t = nd.offsetTop;
			if (y >= t)
			{
				d = nd;
				dy = t;
			}
			else if (d)
				break;
		}

		// If we found a divider to move position it at the top of the
		// clip view.

		if (d)
		{
			var h = d.offsetHeight;
			var mxy = (d != nd) ? nd.offsetTop : (this._$view.get(0).offsetHeight);
			if (y + h >= mxy)
				y = (mxy - h) - dy;
			else
				y = y - dy;

			// XXX: Need to convert this over to using $().css() and supporting the non-transform case.

			var ld = this._lastDivider;
			if (ld && d != ld) {
				setElementTransform($(ld), 0, 0);
			}
			setElementTransform($(d), 0, y + "px");
			this._lastDivider = d;

		}
	}
});

})(jQuery,window,document); // End Component

function ResizePageContentHeight(page)
{
	var $page = $(page);
	var $content = $page.children(".ui-content.tmp-splitview-menu", ".ui-content.tmp-splitview-content");

    if($content.length > 0) {
        var hh = $page.children(".ui-header").outerHeight(); hh = hh ? hh : 0;
        var fh = $page.children(".ui-footer").outerHeight(); fh = fh ? fh : 0;
        var pt = parseFloat($content.css("padding-top"));
        var pb = parseFloat($content.css("padding-bottom"));
        var wh = window.innerHeight;
        $content.height(wh - (hh + fh) - (pt + pb));
    }
}

$("[data-role=page]").live("pageshow", function(event) {
	var $page = $(this);

	// For the demos that use this script, we want the content area of each
	// page to be scrollable in the 'y' direction.

    $page.find(".ui-content.tmp-splitview-menu", ".ui-content.tmp-splitview-content").attr("data-scroll", "y");

	// This code that looks for [data-scroll] will eventually be folded
	// into the jqm page processing code when scrollview support is "official"
	// instead of "experimental".

	$page.find("[data-scroll]:not(.ui-scrollview-clip)").each(function(){
		var $this = $(this);
		// XXX: Remove this check for ui-scrolllistview once we've
		//      integrated list divider support into the main scrollview class.
		if ($this.hasClass("ui-scrolllistview"))
			$this.scrolllistview();
		else
		{
			var st = $this.data("scroll") + "";
			var paging = st && st.search(/^[xy]p$/) != -1;
			var dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null;

			var opts = {};
			if (dir)
				opts.direction = dir;
			if (paging)
				opts.pagingEnabled = true;

			var method = $this.data("scroll-method");
			if (method)
				opts.scrollMethod = method;

			$this.scrollview(opts);
		}
	});

	// For the demos, we want to make sure the page being shown has a content
	// area that is sized to fit completely within the viewport. This should
	// also handle the case where pages are loaded dynamically.

	ResizePageContentHeight(event.target);
});

$(document).live("orientationchange", function(event) {
	ResizePageContentHeight($(".ui-page"));
});
