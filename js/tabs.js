/**
 * jQuery tabs v1.1.0
 * Copyright (c) 2016 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function($){var _error=function(text){if(typeof console=="object")console.warn(text)},_setTab=function(data,tab){data.links.removeClass(data.activeTab).filter('[data-tab="'+tab+'"]').addClass(data.activeTab);data.boxes.removeClass(data.visibleClass+" "+data.hiddenClass).addClass(data.hiddenClass).filter(tab).addClass(data.visibleClass);if(data.steps){if(data.maxStep<data.steps.index(data.steps.filter("."+data.activeTab)))data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab));data.steps.removeClass(data.disabledTab);
for(var i=data.maxStep+1;i<=data.steps.length;i++)data.steps.eq(i).addClass(data.disabledTab)}data.onChange();$(window).trigger("resize")},_initEvents=function(data){data.links.bind("click.tabs",function(){if(!$(this).hasClass(data.disabledTab))_setTab(data,$(this).data("tab"));return false})},methods={init:function(options){return this.each(function(){var $this=$(this);$this.data("tabs",jQuery.extend({},defaults,options));var data=$this.data("tabs");data.context=$this;data.links=$this.find("[data-tab]").not(".detected").addClass("detected");
data.boxes=$();if(data.steps){data.steps=$this.find(data.steps).eq(0).find("[data-tab]");data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab))}data.links.each(function(){data.boxes=data.boxes.add($($(this).data("tab")))});_setTab(data,data.links.filter("."+data.activeTab).eq(0).data("tab"));_initEvents(data)})},setTab:function(tab){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data&&typeof tab=="string")_setTab(data,tab);else _error("Second param need to be String")})},
option:function(name,set){if(set)return this.each(function(){var data=$(this).data("tabs");if(data)data[name]=set});else{var ar=[];this.each(function(){var data=$(this).data("tabs");if(data)ar.push(data[name])});return ar.length>1?ar:ar[0]}},destroy:function(){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data){data.context.find("*").unbind(".tabs").removeClass(data.hiddenClass+" "+data.visibleClass);$(window).unbind(".tabs");$this.removeData("tabs")}})}},defaults={hiddenClass:"hidden",
visibleClass:"visible",activeTab:"active",disabledTab:"disabled",steps:false,onChange:function(){}};$.fn.tabs=function(method){if(methods[method])return methods[method].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else _error("Method "+method+" does not exist on jQuery.tabs")}})(jQuery);
