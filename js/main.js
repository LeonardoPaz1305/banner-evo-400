var MyApp = {
    bannerEvo2: function(){

        if($('.nat-bannerEvo .slider__item').length > 1){
            var swiper = new Swiper('.nat-bannerEvo .swiper-container', {
                loop: true,
                loopFillGroupWithBlank: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true,
                },
                keyboard: {
                    enabled: true,
                },
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                  dynamicBullets: true,
                }
            });

            $(".nat-bannerEvo .swiper-container").on('mouseover', function() {
                (this).swiper.autoplay.stop();
            });
            
            $(".nat-bannerEvo .swiper-container").on('mouseout', function() {
                (this).swiper.autoplay.start();
            });
        }

        $(".nat-bannerEvo .slider__anchor .anchor").click(function(evento){
            evento.preventDefault();
            var codigo = $(this).attr("href");
            $("html,body").animate({scrollTop: $(codigo).offset().top}, 500);
        });    
    },
      contactanos: function(){

        //Select materialize
        var $select = $('.contact__modal select');
        $select.material_select();

        //Funcion de intervalo de hora para el campo select
        function verifyHourDisplay(){
            var hourEnableData = '22:00'; //'22:00'
            var hourDisabledData = '06:00'; //'06:00'
            var hourEnableArray = hourEnableData.split(':');
            var hourDisabledArray = hourDisabledData.split(':');
            var hourEnable = parseInt(hourEnableArray[0]);
            var minuteEnable = parseInt(hourEnableArray[1]);
            var hourDisabled = parseInt(hourDisabledArray[0]);
            var minuteDisabled = parseInt(hourDisabledArray[1]);

            if((hourEnable + minuteEnable) > 0 && (hourDisabled + minuteDisabled) > 0){

                var dateNowBn = new Date();
                var isShow = true;
                if(dateNowBn.getHours() <= hourEnable && dateNowBn.getHours() >= hourDisabled){
                    if(dateNowBn.getHours() == hourEnable || dateNowBn.getHours() == hourDisabled){
                        if((dateNowBn.getHours() == hourEnable && dateNowBn.getMinutes() < minuteEnable) || (dateNowBn.getHours() == hourDisabled && dateNowBn.getMinutes() >= minuteDisabled)){
                            isShow = false;
                        }
                    }else{                        
                        isShow = false;
                    }                    
                }
                
                if(isShow){
                    $('#hour').parent().parent().removeClass('disabled');
                    active();
                }else{
                    var $select = $('#hour')
                    $select.prop('selectedIndex', 0);
                    $select.material_select();
                    active();
                    $('#hour').parent().parent().addClass('disabled');
                }
            }
        }
        verifyHourDisplay();
        setInterval(verifyHourDisplay, 500);
        
        //casos drop down Select
        $(".field__select input[type=text]").blur(function(){
            $('.icon-drop_down').removeClass('active');
        })
        $(".field__select input[type=text]").on('click', function(){
            if($(this).hasClass('active')){
                $('.icon-drop_down').addClass('active');
            }else{
                $('.icon-drop_down').removeClass('active');
            }
        })
        $(".field__select .dropdown-content li").on('click', function(){
            $('.icon-drop_down').removeClass('active');
        });
        $('#termsCondition').on('click', function(){
            $('.field__checkbox').prop("checked", true);
        });

        //Select textos de horario para el modal
        $('#hour').on('change', function(e){
            var $value = $('.dropdown-content li.active').text();
            $('.description--hour').text($value);
        });

        //modales
        $('#formContact').modal({
            dismissible: false,
            ending_top: '10%',    
        });
        $('#movil').modal({
            dismissible: false,
            ending_top: '10%',         
        });
        $('#message').modal({
            dismissible: false,
            complete: function(modal, trigger) {
                $('#message >.container').addClass('hide');
            }
        });
                                                      
        $('#protectClause').modal({
            dismissible: false,
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.                
                //Scroll content Terminos y condiciones 
                var swiperScroll = new Swiper('#protectClause .swiper-container', {
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        dragSize: '35px',
                        draggable: true,
                        snapOnRelease: false,
                    },
                    mousewheel: true,
                }); 
            },
        })

        //Especificaiones de campo
        var $document = $('.contact__modal  #document');
        var $phone = $('.contact__modal  #phone');      

        $phone.on("keypress", function(e) {
            var numTotal = this.value.length;
            key = e.keyCode || e.which;
            if (numTotal == 0) {
                var tecla = String.fromCharCode(key);
                var caracteres = "9";
                var especiales = [8, 9, 37, 39, 46, 6];
                var tecla_especial = false;
                for (var i in especiales) {
                    if (key == especiales[i]) {
                        tecla_especial = true;
                        break;
                    }
                }
                if (caracteres.indexOf(tecla) == -1 && !tecla_especial) {
                    return false;
                }
            }
            return (key > 47 && key < 58);
        });

        $document.on('input', function () { 
            this.value = this.value.replace(/[^0-9]/g,'');
        });
        
        //Titulos modal form
        $('.contact__item').on('click', function(){
            var text = $(this).find('.container .description').text();
            var replaceText = text.toLowerCase().split(" ").join("-");
            var resetText = replaceText.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            $('.contact__modal .modal__title strong').text(text);
            $('#formContact').attr('data-modal',resetText);
        });

        //Atributos modales movil
        $('#movil .modal__btn').on('click', function(){
            var text = $(this).text();
            var replaceText = text.toLowerCase().split(" ").join("-");
            var resetText = replaceText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            $('#formContact').attr('data-modal',resetText);
        });        

        //Valid and enabled button
        $('.field__btn').attr('disabled', true);

        //funciones de validacion de campos
        function doctype(){
            $('#document').on('keyup', function(){
                var option = 1;
                $(this).parent().removeClass('field__invalid');
                if($(this).val().length < 8){
                    option = 0;
                    $(this).parent().addClass('field__invalid');
                }
                setTimeout(function(){
                    active(1,option);
                },5)
            });
        }
        function phone(){
            $('#phone').bind('keyup', function(){
                var option = 1;
                $(this).parent().removeClass('field__invalid');
                if($(this).val().length < 9){
                    option = 0;
                    $(this).parent().addClass('field__invalid');
                }                
                setTimeout(function(){
                    active(2,option);
                },5)
            });
        }
        function hour(){
            $('#hour').on('change', function(e){
                var select = e.target.value;
                var option = 1;
                $(this).parent().removeClass('field__invalid');
                if(select == 0){
                    option = 0;
                    $(this).parent().addClass('field__invalid');
                }
                setTimeout(function(){
                    active(3,option);
                },5)
            });
        }
        function terms(){
            $('#treatment, #termsCondition').on('click', function(){
                var option = 1
                if($(this).prop("checked") == false){
                    option = 0;
                }
                setTimeout(function(){
                    active(4,option);
                },5)
            });
        }           

        //contabilizando las validaciones
        var count = 0, ndocument = 0, nphone = 0, nhours = 0, nterms = 0;
        function active(status,option){
            if( status === 1) { ndocument = option }
            if( status === 2) { nphone = option }
            if( status === 3) { nhours = option }
            if( status === 4) { nterms = option }

            //casos de contabilizacion de validaciones
            if($('#treatment').hasClass('required')){
                if($('.field__group').hasClass("disabled")){
                    count = parseInt(ndocument) + parseInt(nphone) + parseInt(nterms);
                    if(count === 3){
                        $('.field__btn').attr('disabled',false);
                    }else{
                        $('.field__btn').attr('disabled',true);
                    }                
                }else{
                    count = parseInt(ndocument) + parseInt(nphone) + parseInt(nhours) + parseInt(nterms);
                    if(count === 4){
                        $('.field__btn').attr('disabled',false);
                    }else{
                        $('.field__btn').attr('disabled',true);
                    }
                }
            }else{
                if($('.field__group').hasClass("disabled")){
                    count = parseInt(ndocument) + parseInt(nphone);
                    if(count === 2){
                        $('.field__btn').attr('disabled',false);
                    }else{
                        $('.field__btn').attr('disabled',true);
                    }                
                }else{
                    count = parseInt(ndocument) + parseInt(nphone) + parseInt(nhours);
                    if(count === 3){
                        $('.field__btn').attr('disabled',false);
                    }else{
                        $('.field__btn').attr('disabled',true);
                    }
                }
            }                        
        }        
        
        //Envio de Formulario
        $( ".contact__modal form" ).on('submit', function( event ) {
            event.preventDefault();
            
            //reseteando variables de funciones y deshabilitando el boton
            $('.field__btn').attr('disabled', true);
            count = 0;
            ndocument = 0;
            nphone = 0;
            nhours = 0;
            nterms = 0;

            //variables preloading button
            var bar = $('.progress-inner');
            var button = $('.progress-button');

            //removiendo clases al preloading button
            bar.removeClass('notransition');
            button.addClass('state-loading'); 
            
            //variables e intervalo de carga
            var progress = 0,
                interval = setInterval( function() {
                progress = Math.min( progress + Math.random() * 0.1, 1 );
                bar.css({
                    'width': (progress*100) + '%',
                    'opacity': 1
                });

                //deshabilitando campos
                $('.field__input').attr('disabled', true);
                $('.field__checkbox').attr('disabled', true);
                $('.select-dropdown').attr('disabled', true);
                $('.modal-action.modal-close').attr('disabled', true);
                $('.modal__footer .link').attr('disabled', true);

                //validando el progreso de carga
                if( progress === 1 ) {
                    //finalizando animacion de carga
                    button.removeClass('state-loading');
                    button.addClass('state-success');
                    bar.addClass('notransition');
                    bar.css({
                        'width': 0,
                        'opacity': 1
                    });
                    //cerrando intervalo
                    clearInterval( interval );
                    
                    //Limpieza de campos
                    $('#document').val('');
                    $('#phone').val('');
                    var $select = $('#hour').prop('selectedIndex', 0);
                    $select.material_select();
                    $('#treatment').prop('checked', false);                        

                    //habilitando campos
                    $('.field__input').removeAttr('disabled');
                    $('.field__checkbox').removeAttr('disabled');
                    $('.select-dropdown').removeAttr('disabled');
                    $('.modal-action.modal-close').removeAttr('disabled');
                    $('.modal__footer .link').removeAttr('disabled');

                    //mensaje final de la operacion
                    setTimeout(function(){
                        button.removeClass('state-success');
                        //Evento Close modal
                        $('#formContact').modal('close');
                        //Evento open modal
                        $('#message').modal('open');
                        if($('.field__group').hasClass("disabled")){
                            $('.message--2').removeClass('hide');
                        }else{
                            $('.message--3').removeClass('hide');
                        }                        
                    },1000)
                }
            }, 200 );
        }); 

        doctype();
        phone();
        hour();
        terms();
        active();
    },
}

$(function () {
    MyApp.bannerEvo2();
    MyApp.contactanos();
});
