$(document).ready(function(){
				
	initNav();

	// $(".menu").on("click","a", function (event) {
    //     event.preventDefault();
    //     var id  = $(this).attr('href'),
    //         top = $(id).offset().top;
    //     $('body,html').animate({scrollTop: top}, 500);
    // });

    $(".main-btn").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
    });
	
	$('.box-slider').slick({
		arrows: false,
		autoplay: true,
  		autoplaySpeed: 3000
	});

	$('.tabs').tabs();

});

function initNav () {
	$('#header:has(#nav)').each(function(){
		var hold = $(this);
		var link = hold.find('.toogle-menu');
		var box = hold.find('.nav-holder');
		var wrap = $('#wrapper');
		var links = hold.find('.goto')
		
		link.click(function(){
			if(!hold.hasClass('open')){
				setTimeout(function(){
					hold.addClass('open');
				}, 50);
				box.slideDown(500, function () {
					//wrap.css({height: hold.outerHeight()+box.outerHeight()});
					$('body').css({overflow: 'hidden'});
				});
			}
			else{
				box.slideUp(500, function(){
					hold.removeClass('open');
					//wrap.css({height: 'auto'});
				});
				$('body').css({overflow: 'visible'});
			}

			return false;
		});

		links.on('click', function	(){
			$(window).trigger('closeNav')
		})

		$(window).bind('closeNav', function(){
			if(hold.hasClass('open')){
				box.slideUp(500, function(){
					hold.removeClass('open');
				});
				$('body').css({overflow: 'visible'});
			}
		});

		$(window).bind('resize', function(){
			if(hold.hasClass('open')){
				//wrap.css({height: hold.outerHeight()+box.outerHeight()});
			}
		});
	});

	const effects = [

		// Effect 8
		{
			options: {
				shapeColors: ['#35c394','#9985ee','#f54665','#4718f5','#f5aa18'],
				shapesOnTop: true
			},
			hide: {
				lettersAnimationOpts: {
					duration: 300,
					delay: (t,i)  => (t.parentNode.children.length-i-1)*30,
					easing: 'easeOutExpo',
					opacity: 0,
					translateY: (t,i) => i%2 === 0 ? '80%' : '-80%',
					rotate: (t,i) => i%2 === 0 ? -25 : 25
				},
				shapesAnimationOpts: {
					duration: 50,
					easing: 'easeOutExpo',
					translateX: t => t.dataset.tx,
					translateY: t => t.dataset.ty,
						scale: 0,
						rotate: 0,
						opacity: {
							value: 0, 
							duration: 50, 
							easing: 'linear'
						}
					}
				},
				show: {
					lettersAnimationOpts: {
					duration: 400,
					delay: (t,i)  => (t.parentNode.children.length-i-1)*80,
					easing: 'easeOutElastic',
					opacity: {
						value: [0,1], 
						duration: 100, 
						easing: 'linear'
					},
					translateY: (t,i) => i%2 === 0 ? ['-80%', '0%'] : ['80%', '0%'],
						rotate: [90,0]
					},
					shapesAnimationOpts: {
						duration: () => anime.random(1000,3000),
						delay: (t,i) => i*20,
						easing: 'easeOutElastic',
					translateX: t => {
						const tx = anime.random(-250,250);
						t.dataset.tx = tx;
						return [0,tx];
					},
					translateY: t => {
						const ty = anime.random(-250,250);
						t.dataset.ty = ty;
						return [0,ty];
					},
					scale: t => {
						const s = randomBetween(0.1,0.6);
						t.dataset.s = s;
						return [s,s];
					},  
					rotate: () => anime.random(-90,90),
						opacity: {
						value: 0.6, 
						duration: 1000, 
						easing: 'linear'
					}
				}
			}
		}
	];

	class Slideshow {
		constructor(el) {
			this.DOM = {};
			this.DOM.el = el;
			this.DOM.words = Array.from(this.DOM.el.querySelectorAll('.word'));
			this.current = 0;
			this.words = [];
			this.DOM.words.forEach((word, pos) => {
				this.words.push(new Word(word, effects[pos].options));
			});

			this.isAnimating = true;
			this.words[this.current].show(effects[this.current].show).then(() => this.isAnimating = false);
		}
		show(direction) {
			if ( this.isAnimating ) return;
			this.isAnimating = true;

			let newPos;
			let currentPos = this.current;
			if ( direction === 'next' ) {
				newPos = currentPos < this.slidesTotal - 1 ? currentPos+1 : 0;
			}
			else if ( direction === 'prev' ) {
				newPos = currentPos > 0 ? currentPos-1 : this.slidesTotal - 1;
			}

			this.DOM.slides[newPos].style.opacity = 1;
			this.DOM.bgs[newPos].style.transform = 'none';
			anime({
				targets: this.DOM.bgs[currentPos],
				duration: 600,
				easing: [0.2,1,0.3,1],
				translateY: ['0%', direction === 'next' ? '-100%' : '100%'],
				complete: () => {
					this.DOM.slides[currentPos].classList.remove('slide--current');
					this.DOM.slides[currentPos].style.opacity = 0;
					this.DOM.slides[newPos].classList.add('slide--current');
					this.words[newPos].show(effects[newPos].show).then(() => this.isAnimating = false);
				}
			});

			this.words[newPos].hide();
			this.words[this.current].hide(effects[currentPos].hide).then(() => {

				this.current = newPos;
			});
		}
	}
	if($('div').is('.slideshow'))
		const slideshow = new Slideshow(document.querySelector('.slideshow'));
}
