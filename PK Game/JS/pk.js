// ポジションを英語から日本語へ

function positionLang(spot) {
    if (spot == 'leftHigh') {
        spot = '左上'
    } else if (spot == 'centerHigh') {
        spot = '上'
    } else if (spot == 'rightHigh') {
        spot = '右上'
    } else if (spot == 'leftLow') {
        spot = '左下'
    } else if (spot == 'centerLow') {
        spot = '下'
    } else if (spot == 'rightLow') {
        spot = '右下'
    }
    return spot
}

// turnの計算用、奇数だとオフェンス、偶数だとディフェンス
var turn = 1

// スコア計算用
var myPoint = 0
var comPoint = 0

// プレイヤーが選択したシュート位置を記録
var playerSelect

$('.high-left').on('click', function () {
    playerSelect = 'leftHigh'
    console.log(playerSelect)
    $('.selectedPlace').html('左上')
    $('.shootOrBlock').attr('disabled', false);
})

$('.high-center').on('click', function () {
    playerSelect = 'centerHigh'
    console.log(playerSelect)
    $('.selectedPlace').html('上')
    $('.shootOrBlock').attr('disabled', false);
})

$('.high-right').on('click', function () {
    playerSelect = 'rightHigh'
    console.log(playerSelect)
    $('.selectedPlace').html('右上')
    $('.shootOrBlock').attr('disabled', false);
})

$('.low-left').on('click', function () {
    playerSelect = 'leftLow'
    console.log(playerSelect)
    $('.selectedPlace').html('左下')
    $('.shootOrBlock').attr('disabled', false);
})

$('.low-center').on('click', function () {
    playerSelect = 'centerLow'
    console.log(playerSelect)
    $('.selectedPlace').html('下')
    $('.shootOrBlock').attr('disabled', false);
})

$('.low-right').on('click', function () {
    playerSelect = 'rightLow'
    console.log(playerSelect)
    $('.selectedPlace').html('右下')
    $('.shootOrBlock').attr('disabled', false);
})

$('.shootOrBlock').on('click', function () {
    if (turn % 2 == 1) {
        // オフェンスのとき
        // 判定処理

        var placeNumber = Math.floor(Math.random() * 6)
        // var placeNumber = 0
        console.log(placeNumber, 'シュートする位置変換前')

        var place
        // シュートする位置を変換する
        if (placeNumber == 0) {
            place = 'leftHigh'
        } else if (placeNumber == 1) {
            place = 'centerHigh'
        } else if (placeNumber == 2) {
            place = 'rightHigh'
        } else if (placeNumber == 3) {
            place = 'leftLow'
        } else if (placeNumber == 4) {
            place = 'centerLow'
        } else if (placeNumber == 5) {
            place = 'rightLow'
        }

        console.log(place, 'ブロック位置')
        // シュート位置の確認を出力する

        $('.keeperPosition').html(positionLang(place));

        var result
        if (playerSelect == place) {
            result = 'failure'
            $('.result').html('シュート失敗');
            $('.' + turn).html('❌');
        } else {
            result = 'success'
            $('.result').html('GOOOOOOOOAL!!!');
            $('.' + turn).html('⭕');
            myPoint = myPoint + 1
        }
        console.log(playerSelect, '位置')
        console.log(result, '結果')

    } else {
        // ディフェンスのとき
        // 判定処理

        var placeNumber = Math.floor(Math.random() * 6)
        // var placeNumber = 0
        console.log(placeNumber, 'シュートする位置変換前')

        var place
        // ブロックする位置を変換する
        if (placeNumber == 0) {
            place = 'leftHigh'
        } else if (placeNumber == 1) {
            place = 'centerHigh'
        } else if (placeNumber == 2) {
            place = 'rightHigh'
        } else if (placeNumber == 3) {
            place = 'leftLow'
        } else if (placeNumber == 4) {
            place = 'centerLow'
        } else if (placeNumber == 5) {
            place = 'rightLow'
        }

        console.log(place, 'シュート位置')
        // ブロック位置の確認を出力する

        $('.keeperPosition').html(positionLang(place));

        var result
        if (playerSelect == place) {
            result = 'failure'
            $('.result').html('NICE BLOCK!!!');
            $('.' + turn).html('❌');
        } else {
            result = 'success'
            $('.result').html('ブロック失敗');
            $('.' + turn).html('⭕');
            comPoint = comPoint + 1
        }
        console.log(playerSelect, 'シュート位置')
        console.log(result, '結果')

    }

    // ボタンを非活性化・活性化
    $('.shootOrBlock').attr('disabled', true);
    $('.next').attr('disabled', false);

});

$('.next').click(function (e) {
    console.log(turn, '今回のターンの出力')

    let restTurns = 5 - Math.round((turn - 1) / 2)
    console.log(restTurns, '残ターン数')

    if (turn % 2 == 1) {
        // 次のターンに向けて表示を入れ替える
        $('.turn').html('ディフェンスです、ブロックする方向を選んでください');
        $('.shootOrBlock').html('ブロック');
        $('.opponentSelect').html('シュートされた方向');
    } else {
        // 次のターンに向けて表示を入れ替える
        $('.turn').html('オフェンスです、シュートする方向を選んでください');
        $('.shootOrBlock').html('シュート');
        $('.opponentSelect').html('ブロックされた場所');
    }

    // 途中終了する場合の判定
    if (myPoint > comPoint + restTurns) {
        alert('勝利です、おめでとう')
        location.reload();
    } else if (comPoint > myPoint + restTurns) {
        alert('敗北です、残念！')
        location.reload();
    }

    turn = turn + 1
    console.log(turn, '次のターンの出力')


    // 最終判定（こっちはいじらない）
    if (turn == 11) {
        if (myPoint == comPoint) {
            alert('引き分けです！')
            location.reload();
        } else if (myPoint > comPoint) {
            alert('勝利です、おめでとう！')
            location.reload();
        } else if (myPoint < comPoint) {
            alert('敗北です、残念！')
            location.reload();
        }
    }

    // 表示をデフォルトへ戻す
    $('.selectedPlace').html('未選択');
    $('.keeperPosition').html('<br>');
    $('.result').html('<br>');

    // ボタンを非活性化・活性化
    $('.shootOrBlock').attr('disabled', true);
    $('.next').attr('disabled', true);

    // ポイントの確認
    console.log(myPoint, 'あなたの成功数')
    console.log(comPoint, 'COMの成功数')

});
