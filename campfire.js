'use strict';

import axios from 'axios';

const CF_URL = `https://camp-fire.jp/channels/sparks`;

axios.get(CF_URL).then(res => {
    const bodyall = res.data;
    let parts = bodyall.split('data_project_id=');
    parts.shift();

    for (let i = 0, len = parts.length; i < len; i++) {
        const part = parts[i];
        const project = {};
        project.percentage = part.match(/<span>(.*?)%<\/span>/)[1]; //達成率
        project.yen = part.match(/<\/small>(.*?)円<\/div>/)[1]; //円
        project.patron = part.match(/パトロン<\/small>(.*?)人<\/div>/)[1]; //パトロン数
        project.remaining_days = part.match(/残り<\/small>(.*?)日<\/div>/)[1]; //残り日数
        project.title = part.match(/<a title="(.*?)" href="/)[1]; //タイトル
        project.description = (part.match(/class="sub"><p>(.*?)<\/p>/)) ? (part.match(/class="sub"><p>(.*?)<\/p>/)[1]) : ''; //概要
        project.link = 'https://camp-fire.jp' + part.match(/div class="box-thumbnail"><a href="(.*?)">/)[1]; //リンク
        // project.image = part.match(/class=" lazyloaded" data-srcret="(.*?)">/)[1]; //画像
        console.log(project);      
    }

})