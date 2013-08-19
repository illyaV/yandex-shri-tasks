( function( window, document, $, undefined ){
  
  function Accordion( $obj ) {
    this.element = $obj;
  }

  Accordion.prototype.init = function(){
    var self = this;
    
    this.element.find("h3").addClass('opened')
                           .on( 'click', function(){ self.slideItem( $( this ) ); } );  
  };

  Accordion.prototype.slideItem = function( $item ) {
    if ( $item.is('.opened') ) {
      $item.removeClass('opened').next( 'div' ).slideUp( 200 );
    } else {
      $item.addClass('opened').next( 'div' ).slideDown( 200 );	
    }
  };

  function Form( $obj ) {
    this.element = $obj;
    this.accordion = this.element.find( '#accordion' );
    this.textareas = this.element.find( 'textarea' );
    this.buttonSubmit = this.element.find( '#submit' );
    this.buttonClean = this.element.find( '#clean' );
    this.progressLine = this.element.find('.form-progress-line');
    this.progressValue = this.element.find('.form-progress-value');
  }

  Form.prototype.sendData = function(  ) {
    console.log('sendData');  
  };

  Form.prototype.checkData = function( $textarea ) {
    var $header =  $textarea.parent().prev('h3')
        progress = 0,
        isValid = this.isValid( $textarea );
       
    
    if ( isValid === true ) {
      $header.addClass('valid').find('.form-question-header-msg').text('ОК');
    } else {
      $header.removeClass('valid').find('.form-question-header-msg').text( isValid );  
    }

    this.redrawProgressBar( this.getProgress() );
  };
  
  Form.prototype.isValid = function( $textarea ) {
    var type = $textarea.data('type'),
        val = $.trim( $textarea.val() ),
        msg = true,
        regExp = {};
    
    if ( val.length < 4 ) { 
      return '';
    }

    regExp.url = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;

    switch ( type ) {
      case 'date':
      break;
      case 'string':
      break;
      case 'url':
        if( !regExp.url.test( val ) ){
          msg = 'Вы не указали URL (или указали с ошибкой)';
        }
      break;
    }

    return msg;
  };
  
  Form.prototype.redrawProgressBar = function( procent ) {
    this.progressValue.text( procent+'%' );
    this.progressLine.css( { 'width': procent + '%' } );    
  };

  Form.prototype.getProgress = function() {
    var total = this.textareas.length,
        сompleteFields = this.element.find( '.valid' ).length,
        procent = 0;
    
    procent = ( сompleteFields/total * 100 ).toFixed();

    return procent;
  };

  Form.prototype.cleanForm = function() {
    if ( confirm( 'Вы действительно хотте очистить все поля анкеты?' ) ) {
      this.textareas.val('');
      this.redrawProgressBar( 0 );
      this.element.find( '.valid' ).removeClass('valid');
    }
  };
   
  Form.prototype.init = function() {
    var self = this;
        accordion = new Accordion( this.accordion ),
        
    accordion.init();

    this.buttonSubmit.on( 'click', function(){ self.sendData(); } );
    this.buttonClean.on( 'click', function(){ self.cleanForm(); } );
    this.textareas.on( 'blur', function(){ self.checkData( $(this) ); } );
  }
  
  var form = new Form( $( '#form' ) );
  form.init();

} )( window, document, jQuery );