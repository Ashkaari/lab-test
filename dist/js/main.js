$(document).ready(function(){function t(t,e){o?(console.log("setting mobile dates"),$date_in.text($.datepicker.formatDate("dd",t)),$month_short_in.text($.datepicker.formatDate("M",t)),$day_short_in.text($.datepicker.formatDate("DD",t)),$date_out.text($.datepicker.formatDate("dd",e)),$month_short_out.text($.datepicker.formatDate("M",e)),$day_short_out.text($.datepicker.formatDate("DD",e))):($checkInWeekday.text($.datepicker.formatDate("DD",t)),$checkOutWeekday.text($.datepicker.formatDate("DD",e))),$input_checkIn.val($.datepicker.formatDate("dd M yy",t)),$input_checkOut.val($.datepicker.formatDate("dd M yy",e))}function e(t,e){var n=Math.floor((e.getTime()-t.getTime())/864e5);$(".separate span").text(n)}function n(){$(window).width()>1e3?(console.log("reinicializing to big"),$content_datepicker.datepicker({range:"period",numberOfMonths:2,onSelect:function(n,o,a){t(a.startDate,a.endDate),e(a.startDate,a.endDate)}})):(o=!0,console.log("reinicializing to small"),$content_datepicker.datepicker({range:"period",numberOfMonths:1,onSelect:function(n,o,a){t(a.startDate,a.endDate),e(a.startDate,a.endDate)}}))}$(window).resize(function(){n()});var o=!1;$content_datepicker=$(".content__datepicker"),$input_checkIn=$(".datepicker.check-in"),$input_checkOut=$(".datepicker.check-out"),$checkOutWeekday=$("#checkOutWeekday"),$checkInWeekday=$("#checkInWeekday"),$date_in=$(".content__selectors-cell.check-in .big"),$month_short_in=$(".content__selectors-cell.check-in .month"),$day_short_in=$(".content__selectors-cell.check-in .day"),$date_out=$(".content__selectors-cell.check-out .big"),$month_short_out=$(".content__selectors-cell.check-out .month"),$day_short_out=$(".content__selectors-cell.check-out .day");var a='<div class="kids_age-list-item">\n                                        <select class="counter-field_num kids">\n                                            <option value="0"><1</option>\n                                            <option value="1">1</option>\n                                            <option value="2">2</option>\n                                            <option value="3">3</option>\n                                            <option value="4">4</option>\n                                            <option value="5">5</option>\n                                            <option value="6">6</option>\n                                            <option value="7">7</option>\n                                            <option value="8">8</option>\n                                            <option value="9">9</option>\n                                            <option value="10">10</option>\n                                            <option value="11">11</option>\n                                            <option value="12">12</option>\n                                            <option value="13">13</option>\n                                            <option value="14">14</option>\n                                            <option value="15">15</option>\n                                            <option value="16">16</option>\n                                            <option value="17">17</option>\n                                        </select>\n                                    </div>';n(),$content_datepicker.datepicker("setDate",["+4d","+8d"]);var i=$content_datepicker.datepicker("widget").data("datepickerExtensionRange");t(i.startDate,i.endDate),e(i.startDate,i.endDate),$selected_rooms=$('.counter-fields[data-targ="room"] .counter-field_num'),$selected_adults=$('.counter-fields[data-targ="adults"] .counter-field_num'),$selected_kids=$('.counter-fields[data-targ="kids"] .counter-field_num'),$kids_frame=$(".kids_age");var c={room:{1:"номер, ",2:"номер(-ов), "},adults:{1:"взрослый, ",2:"взрослых"},kids:{0:"детей",1:"ребёнок",2:"детей"}};$(".сell-results").on("click",function(){$(".content__persons_frame").toggleClass("active")}),$(".content__selectors-date").on("click",function(){$(".content__datepicker").toggleClass("inactive")}),$(".counter-field").on("click",function(t){t.preventDefault();var e=$(this).parent(),n=e.find(".counter-field_num"),o="",i=n.text(),d=e.data("targ");$(this).hasClass("remove")&&(o="remove","kids"==d&&0!=i?(n.text(i-1),0==n.text()&&$(this).addClass("inactive")):"kids"!=d&&1!=i&&(n.text(i-1),1==n.text()&&$(this).addClass("inactive")),$(".cell-results."+d).text(n.text()+" "+(1!=n.text()?c[d][2]:c[d][n.text()])),e.find(".counter-field.add").removeClass("inactive")),$(this).hasClass("add")&&9!=i&&(o="add",n.text(Number(i)+1),9==n.text()&&$(this).addClass("inactive"),$(".cell-results."+d).text(n.text()+" "+(1!=n.text()?c[d][2]:c[d][n.text()])),e.find(".counter-field.remove").removeClass("inactive")),"kids"==d&&function(t,e){var n=$(".kids_age-list-item").length;if("add"==e)for(var o=0;o<t-n;o++)$(".kids_age-list").append(a);else for(o=0;o<n-t;o++)$(".kids_age-list-item").last().remove()}(n.text(),o),0!=$selected_kids.text()?$kids_frame.removeClass("inactive"):$kids_frame.addClass("inactive")}),$(".content__selectors-button").on("click",function(){var t={data:{rooms:$selected_rooms.text(),adults:$selected_adults.text(),kids:{amount:$selected_kids.text(),ages:[]},check_in_date:$input_checkIn.val(),check_out_date:$input_checkOut.val()}};0!=t.data.kids.amount&&$(".kids_age-list-item option:selected").map(function(){t.data.kids.ages.push(this.value)}),$.ajax({type:"POST",url:"test_ajax.php",data:t,success:function(t){$(".content-description").html(t)}})})});