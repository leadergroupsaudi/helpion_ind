/**
 * ---------------------------------------------------------------------
 *
 * GLPI - Gestionnaire Libre de Parc Informatique
 *
 * http://glpi-project.org
 *
 * @copyright 2015-2024 Teclib' and contributors.
 * @copyright 2003-2014 by the INDEPNET Development Team.
 * @licence   https://www.gnu.org/licenses/gpl-3.0.html
 *
 * ---------------------------------------------------------------------
 *
 * LICENSE
 *
 * This file is part of GLPI.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * ---------------------------------------------------------------------
 */
var Reservations=function(){this.is_all=!0,this.id=0,this.rand="",this.dom_id="",this.calendar=null,this.license_key=null,this.currentv=null,this.defaultDate=null,this.can_reserve=!0,this.now=null;var e=this;e.init=function(t){e.id=t.id||0,e.is_all=t.is_all||!0,e.rand=t.rand||!0,e.is_tab=t.is_tab||!1,e.license_key=t.license_key||"",e.dom_id="reservations_planning_"+e.rand,e.currentv=t.currentv||"dayGridMonth",e.defaultDate=t.defaultDate||new Date,e.defaultPDate=new Date(e.defaultDate),null!=t.can_reserve&&(e.can_reserve=t.can_reserve),e.now=t.now||null},e.displayPlanning=function(){e.calendar=new FullCalendar.Calendar(document.getElementById(e.dom_id),{schedulerLicenseKey:e.license_key,timeZone:"UTC",nowIndicator:!0,now:e.now,theme:!0,editable:!0,defaultDate:e.defaultDate,minTime:CFG_GLPI.planning_begin,maxTime:CFG_GLPI.planning_end,weekNumbers:!0,defaultView:null!==localStorage.getItem("fcDefaultViewReservation")?localStorage.getItem("fcDefaultViewReservation"):e.currentv,height:function(){var t=$(window).height()-272;$("#debugajax").length>0&&(t-=$("#debugajax").height()),e.is_tab&&(t=$(".glpi_tabs ").height()-150);return t<300&&(t=300),t},resourceAreaWidth:"15%",plugins:["dayGrid","interaction","list","timeGrid","resourceTimeline"],header:{left:"prev,next,today",center:"title",right:"dayGridMonth, timeGridWeek, timeGridDay, listFull, resourceWeek"},views:{listFull:{type:"list",titleFormat:function(){return""},visibleRange:function(t){var a=t.getFullYear(),n=1;return e.id>0&&(n=10),{start:new Date(t.getTime()).setFullYear(a-n),end:new Date(t.getTime()).setFullYear(a+n)}}},resourceWeek:{type:"resourceTimeline",buttonText:__("Timeline Week"),duration:{weeks:1},groupByDateAndResource:!0,slotLabelFormat:[{week:"short"},{weekday:"short",day:"numeric",month:"numeric",omitCommas:!0},function(e){return e.date.hour}]}},events:{url:CFG_GLPI.root_doc+"/ajax/reservations.php",type:"GET",extraParams:{action:"get_events",reservationitems_id:e.id},success:function(){},failure:function(e){}},resources:{url:CFG_GLPI.root_doc+"/ajax/reservations.php",method:"GET",extraParams:{action:"get_resources"}},eventRender:function(t){var a=t.event.extendedProps,n=$(t.el),i=t.view;if("icon"in a&&!e.is_tab){var r="";"icon_alt"in a&&(r=a.icon_alt),n.find(".fc-title, .fc-list-item-title").append("&nbsp;<i class='"+a.icon+"' title='"+r+"'></i>")}var l={target:"mouse",adjust:{mouse:!1},viewport:$(window)};i.type.indexOf("list")>=0&&(l.target=n.find("a")),n.qtip({position:l,content:a.comment,style:{classes:"qtip-shadow qtip-bootstrap"},show:{solo:!0,delay:100},hide:{fixed:!0,delay:100}})},dayRender:function(t){e.dateAreSameDay(t.date,e.defaultPDate)&&$(t.el).addClass("defaultDate")},viewSkeletonRender:function(e){var t=e.view;localStorage.setItem("fcDefaultViewReservation",t.type)},eventResize:function(t){e.editEvent(t)},eventDrop:function(t){e.editEvent(t)},selectable:e.can_reserve,select:function(t){e.can_reserve&&glpi_ajax_dialog({title:__("Add reservation"),url:CFG_GLPI.root_doc+"/ajax/reservations.php",params:{action:"add_reservation_fromselect",id:e.id,start:t.start.toISOString(),end:t.end.toISOString()},dialogclass:"modal-lg"}),e.calendar.unselect()},eventClick:function(e){var t=e.event,a=t.extendedProps.ajaxurl,n=t.extendedProps._editable;e.jsEvent.preventDefault(),n&&a&&glpi_ajax_dialog({title:__("Edit reservation"),url:a+"&ajax=true",dialogclass:"modal-lg"})}}),e.calendar.render();var t=Object.keys(FullCalendarLocales);1===t.length&&e.calendar.setOption("locale",t[0])},e.editEvent=function(e){var t=e.event,a=e.revert,n=t.start,i=t.end;$.ajax({url:CFG_GLPI.root_doc+"/ajax/reservations.php",type:"POST",data:{action:"update_event",start:n.toISOString(),end:i.toISOString(),id:t.id},success:function(e){e||a()},error:function(){a()}})},e.dateAreSameDay=function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate()}};