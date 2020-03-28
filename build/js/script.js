
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
