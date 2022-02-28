(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#343232',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            background: '#bfbfbf'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #bfbfbf',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#bfbfbf'
        },
        stick1: {
            left: 0,
            top: 258
        },
		stick2: {
			right: 0,
			top: 258
		},
    };

    var CONSTS = {
    	gameSpeed: 20,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0
    };

    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
        .appendTo('#pong-game');
		$('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
        .appendTo('#pong-game');
    }

    function setEvents() {
        $(document).on('keydown', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -10;
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            }
        });
		
		 $(document).on('keydown', function (e) {
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 10;
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 0;
            }
        });
		
		 $(document).on('keydown', function (e) {
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = -10;
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 38) {
                CONSTS.stick2Speed = 0;
            }
        });
		
		 $(document).on('keydown', function (e) {
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 10;
            }
        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 40) {
                CONSTS.stick2Speed = 0;
            }
        });
		
		
    }
	
	var score1 = 0;
	var score2 = 0;
	
    function loop() {
        window.pongLoop = setInterval(function () {
            CSS.stick1.top += CONSTS.stick1Speed;
            $('#stick-1').css('top', CSS.stick1.top);
			
			CSS.stick2.top += CONSTS.stick2Speed;
            $('#stick-2').css('top', CSS.stick2.top);

            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;
			
            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = - CONSTS.ballTopSpeed;
            }
			
            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            if (CSS.ball.left <= CSS.stick.width) {
				if (CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height) {
					(CONSTS.ballLeftSpeed = - CONSTS.ballLeftSpeed)
				} else {
					score2 = score2 + 1;
					document.getElementById("score2").innerHTML = score2.toString();
					roll();

					if (score2 == 5) {
						alert ("Player 2 wins!");
						document.getElementById("score1").innerHTML = "0";
						document.getElementById("score2").innerHTML = "0";
						score1 = 0;
						score2 = 0;
					}
				}	    
            }
			
			
			if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
				if (CSS.ball.top > CSS.stick2.top && CSS.ball.top < CSS.stick2.top + CSS.stick.height) {
				(CONSTS.ballLeftSpeed = - CONSTS.ballLeftSpeed)
				} else {
					score1 = score1 + 1;
					document.getElementById("score1").innerHTML = score1.toString();
					roll();
					
					if (score1 == 5) {
						alert ("Player 1 wins!");
						document.getElementById("score1").innerHTML = "0";
						document.getElementById("score2").innerHTML = "0";
						score1 = 0;
						score2 = 0;
					}
				}
			}
			
			CSS.stick1.top += CONSTS.stick1Speed;
			CSS.stick2.top += CONSTS.stick2Speed;
			
			if (CSS.stick1.top <= 0) {
				CSS.stick1.top =0;
			}
			
			if (CSS.stick2.top <= 0) {
				CSS.stick2.top =0;
			}
			
			if (CSS.stick1.top >= CSS.arena.height - CSS.stick.height) {
				CSS.stick1.top = CSS.arena.height - CSS.stick.height;
			}
			
			if (CSS.stick2.top >= CSS.arena.height - CSS.stick.height) {
				CSS.stick2.top = CSS.arena.height - CSS.stick.height;
			}
			
			
			
        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = (CSS.arena.height/2);
        CSS.ball.left = (CSS.arena.width/2);

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * ((Math.random() * 2) + 3);
    }

    start();
})();