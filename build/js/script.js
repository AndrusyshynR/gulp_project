
// activ header

// (function () {
//     const header = document.querySelector('.navi');
//     window.onscroll = () => {
//         if (window.pageYOffset > 50) {
//             header.classList.add('navi_active');
//         } else {
//             header.classList.remove('navi_active');
//         }
//     };
// }());

// Scroll to anchors

// (function () {

//     const smoothScroll = function (targetEl, duration) {
//         const headerElHeight = document.querySelector('.nav').clientHeight;

//         let target = document.querySelector(targetEl);
//         let targetPosition = target.getBoundingClientRect().top - headerElHeight;
//         let startPosition = window.pageYOffset;
//         let startTime = null;

//         const ease = function (t, b, c, d) {
//             t /= d / 2;
//             if (t < 1) return c / 2 * t * t + b;
//             t--;
//             return -c / 2 * (t * (t - 2) - 1) + b;
//         };

//         const animation = function (currentTime) {
//             if (startTime === null) startTime = currentTime;
//             const timeElapsed = currentTime - startTime;
//             const run = ease(timeElapsed, startPosition, targetPosition, duration);
//             window.scrollTo(0, run);
//             if (timeElapsed < duration) requestAnimationFrame(animation);
//         };
//         requestAnimationFrame(animation);

//     };

//     const scrollTo = function () {
//         const links = document.querySelectorAll('.js-scroll');
//         links.forEach(each => {
//             each.addEventListener('click', function () {
//                 const currentTarget = this.getAttribute('href');
//                 smoothScroll(currentTarget, 1500);
//             });
//         });
//     };
//     scrollTo();
// }());

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
	V = 0.2; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
	linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
		e.preventDefault(); //отменяем стандартное поведение
		var w = window.pageYOffset, // производим прокрутка прокрутка
			hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
		t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
			start = null;
		requestAnimationFrame(step);

		function step(time) {
			if (start === null) start = time;
			var progress = time - start,
				r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
			window.scrollTo(0, r);
			if (r != w + t) {
				requestAnimationFrame(step)
			} else {
				location.hash = hash
			}
		}
	}, false);
}

$(document).ready(function () {
	//E-mail Ajax Send
	$("form").submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize()
		}).done(function () {
			$(document).ready(function () {
				alert('Excellent. Expect a call!');
			});
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
});

function alert(content, afterFunction) {
	$('<div class="alertm_overlay"></div>').appendTo('body');
	$('<div class="alertm_all"><a href="#" onclick="alert_close(' + afterFunction + '); return false" class="alertm_close">x</a><div class="alertm_wrapper">' + content + '</div><div class="alertm_but" onclick="alert_close(' + afterFunction + '); return false">OK</div></div>').appendTo('body');
	$(".alertm_overlay, .alertm_all").fadeIn("slow");
	$('.alertm_all').css('margin-top', (-1) * ($('.alertm_all').height()) + 'px');
}

function alert_close(afterFunctionClouse) {
	$(".alertm_overlay, .alertm_all").remove();
	afterFunctionClouse;
}

// $(document).ready(function () {
// 	//E-mail Ajax Send
// 	$("form").submit(function () { //Change
// 		var th = $(this);
// 		$.ajax({
// 			type: "POST",
// 			url: "/mail.php", //Change
// 			data: th.serialize()
// 		}).done(function () {
// 			alert("Thank you!");
// 			setTimeout(function () {
// 				// Done Functions
// 				th.trigger("reset");
// 			}, 1000);
// 		});
// 		return false;
// 	});
// });