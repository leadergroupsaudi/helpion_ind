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
var x_before_drag=0,y_before_drag=0,dirty=!1,initRack=function(){$(document).on("click","#sviewlist",(function(){$("#viewlist").show(),$("#viewgraph").hide(),$(this).addClass("selected"),$("#sviewgraph").removeClass("selected")})).on("click","#sviewgraph",(function(){$("#viewlist").hide(),$("#viewgraph").show(),$(this).addClass("selected"),$("#sviewlist").removeClass("selected")})).on("click","#toggle_images",(function(){$("#toggle_text").toggle(),$(this).toggleClass("active"),$("#viewgraph").toggleClass("clear_picture")})).on("click","#toggle_text",(function(){$(this).toggleClass("active"),$("#viewgraph").toggleClass("clear_text")})).on("click",".cell_add",(function(){var t=grid_rack_units-$(this).index(),a=$(this).parents(".rack_side").hasClass("rack_front")?0:1;glpi_ajax_dialog({url:grid_link_url,method:"get",dialogclass:"modal-xl",params:{racks_id:grid_rack_id,orientation:a,position:t,ajax:!0}})})).on("click","#add_pdu",(function(t){t.preventDefault(),glpi_ajax_dialog({title:__("Add PDU"),url:grid_item_ajax_url,method:"get",dialogclass:"modal-xl",params:{racks_id:grid_rack_id,action:"show_pdu_form",ajax:!0}})})),GridStack.initAll({cellHeight:21,margin:0,marginBottom:1,float:!0,disableOneColumnMode:!0,animate:!0,removeTimeout:100,disableResize:!0}).forEach((function(t){var a=$(t.el).hasClass("side_pdus_graph");t.on("dragstart",(function(t){var a=$(t.target);x_before_drag=Number(a.attr("gs-x")),y_before_drag=Number(a.attr("gs-y")),a.qtip("hide",!0)})).on("change",(function(e,i){if(!dirty){var r=$(t.el).parents(".racks_col").hasClass("rack_rear");$.each(i,(function(e,i){var s=$(i.el),d=s.hasClass("half_rack"),o=grid_rack_units-s.attr("gs-y")-s.attr("gs-h")+1;$.post(grid_item_ajax_url,{id:i.id,action:a?"move_pdu":"move_item",position:o,hpos:getHpos(s.attr("gs-x"),d,r)},(function(a){if(a.status){var e=s.hasClass("item_rear")?"item_front":"item_rear",r=$(".grid-stack-item."+e+"[gs-id="+s.attr("gs-id")+"]");if(r.length){var d=GridStack.init({},$(r).closest(".grid-stack")[0]),o=parseInt(s.attr("gs-x")),l=parseInt(s.attr("gs-y"));1==s.attr("gs-w")&&(o=0==s.attr("gs-x")?1:0),dirty=!0,d.update(r[0],{x:o,y:l}),dirty=!1}}else dirty=!0,t.update(i.el,{x:x_before_drag,y:y_before_drag}),dirty=!1,displayAjaxMessageAfterRedirect()})).fail((function(){dirty=!0,t.update(i.el,{x:x_before_drag,y:y_before_drag}),dirty=!1,displayAjaxMessageAfterRedirect()}))}))}})).on("dragstart",(function(t){var a=$(t.target);x_before_drag=Number(a.attr("gs-x")),y_before_drag=Number(a.attr("gs-y")),a.qtip("hide",!0)}))})),$("#viewgraph .cell_add, #viewgraph .grid-stack-item").each((function(){var t=$(this).find(".tipcontent");t.length&&$(this).qtip({position:{my:"left center",at:"right center"},content:{text:t},style:{classes:"qtip-shadow qtip-bootstrap rack_tipcontent"}})}));for(var t=grid_rack_units;t>=1;t--)$(".indexes").append("<li>"+t+"</li>"),$(".racks_add").append('<div class="cell_add"><span class="tipcontent">'+grid_rack_add_tip+"</span></div>")},getHpos=function(t,a,e){return a?0!=t||e?0==t&&e?2:1==t&&e?1:1!=t||e?void 0:2:1:0};