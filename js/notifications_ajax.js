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
!function(i,t){function o(n){var e=this,s=t("<div></div>"),c=t("<div></div>");this.options=t.extend({},o.default,n),this.showNotification=function(o,n,c,a){s.queue((function(){var s=this;setTimeout((function(){t(s).dequeue()}),100);var r=new Notification(n,{body:c,icon:e.options.icon});void 0!==a&&null!=a&&(r.url_item=a,r.onclick=function(t){t.preventDefault(),i.open(this.url_item,"_blank")}),t.ajax({url:CFG_GLPI.root_doc+"/ajax/notifications_ajax.php",method:"GET",data:{delete:o}})}))},this.playAudio=function(o){if(!o||!("Audio"in i))return!1;var n=new Audio;t(n).append(t("<source />",{src:CFG_GLPI.root_doc+"/sound/"+o+".mp3",type:"audio/mpeg"})),t(n).append(t("<source />",{src:CFG_GLPI.root_doc+"/sound/"+o+".ogg",type:"audio/ogg"})),c.queue((function(){var i=this;n.onended=function(){t(i).dequeue()},n.play()}))},this.checkNewNotifications=function(){if(!e.isSupported())return!1;t.getJSON(CFG_GLPI.root_doc+"/ajax/notifications_ajax.php").done((function(i){if(i){for(var t=0;t<i.length;t++){var o=i[t];e.showNotification(o.id,o.title,o.body,o.url)}e.options.sound&&e.playAudio(e.options.sound)}}))},this.checkConcurrence=function(){var i="glpi_ajaxnotification_lastcheck_"+this.options.user_id,t=localStorage.getItem(i);t||(t=0);var o=(new Date).getTime();t<=o-this.options.interval+50&&(localStorage.setItem(i,o),this.checkNewNotifications())},this.startMonitoring=function(){this.checkConcurrence(),setInterval(this.checkConcurrence.bind(this),this.options.interval)},this.checkPermission=function(){"granted"===Notification.permission?this.startMonitoring():"denied"!==Notification.permission&&Notification.requestPermission((function(i){"granted"===i&&this.startMonitoring()}))},this.start=function(){if(!this.isSupported())return!1;this.checkPermission()},this.isSupported=function(){return"Notification"in i&&"localStorage"in i}}o.default={interval:1e4,sound:!1,icon:!1,user_id:0},i.GLPINotificationsAjax=o}(window,jQuery);