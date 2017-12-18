<?php
      $temp = $_POST['data'];
      $isPluralAdults = $temp['adults'] > 1? true : false;
      $isPluralKids = $temp['kids']['amount'] > 1 || $temp['kids']['amount'] == 0 ? true : false;
      echo '<span>Благодарим за поиск</span><br/>'.$temp['rooms'].' номер(-ов), для '.$temp['adults'].' '.($isPluralAdults? 'взрослых' : 'взрослого').' и '.$temp['kids']['amount'].' '.($isPluralKids? 'детей' : 'ребёнка').'';
?>