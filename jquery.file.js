/*
*  Copyright (c) 2013, Sandro Alves Peres
*  All rights reserved.
*
*  Date: 03/12/2013
*  http://www.zend.com/en/yellow-pages#show-ClientCandidateID=ZEND022656
*/ 

(function($){

    var default_options = {
        label: 'Anexo',
        tip_remove: 'Remover Arquivo',
        width: 180,
        height: 26
    };

    var methods = {
        
        _init: function( options ) 
        {                    
            if( options ) // Merge options
            {
                for( var i in options )
                {
                    default_options[i] = options[i];
                }
            }
            
            this.each(function()
            {  
                if( !$(this).is(':file') )
                {
                    return;
                }               
                
                // Settings
                // *************************************************************
                                
                if( !$(this).parent().hasClass('file-wrapper') ) // it wasn't built yet
                {
                    $(this).after(
                        '<div class="file-wrapper' + ($(this).is(':disabled') ? ' file-wrapper-disabled' : '') + '" id="jQueryFile' + $(this).attr('id') + '" onselectstart="return false;">' +
                        '   <span class="file-path" onselectstart="return false;"></span>' +                        
                        '   <span class="file-button" onselectstart="return false;">' + default_options.label + '</span>' +                    
                        '   <a href="javascript:void(0);" class="file-button-remove" title="' + default_options.tip_remove + '" onselectstart="return false;">x</a>' +  
                        '</div>'
                    ); 

                    $(this).prependTo('#jQueryFile' + $(this).attr('id'));
                }
                
                $('#jQueryFile' + $(this).attr('id')).width( default_options.width );
                $('#jQueryFile' + $(this).attr('id')).height( default_options.height );
                
                $(this).height( default_options.height ); // input
                $(this).next().css('line-height', (default_options.height - 2) + 'px'); // path
                $(this).next().next().css('line-height', (default_options.height - 2) + 'px'); // button                              
                $(this).next().next().next().css('line-height', (default_options.height - 2) + 'px'); // remove button 
               
                $(this).parent().children().mousedown(function(ev)
                {
                    if( typeof ev.preventDefault != undefined )
                    {
                        ev.preventDefault();
                    }   
                }); 
                
                var file = $(this).val().replace(/^.*[\/\\]/gi, '').replace(/^[\s\t\n\r]|[\s\t\n\r]+$/g, '');

                $(this).next().text( file );

                if( file == '' )
                {
                    $(this).next().next().next().hide();
                    $(this).removeAttr('title');
                }
                else
                {
                    $(this).next().next().next().show();
                    $(this).attr('title', file);
                }                
               
                // Remove Button Click
                // ************************************************************* 
                
                $('#jQueryFile' + $(this).attr('id') + ' .file-button-remove').click(function()
                {    
                    if( $(this).parent().children(':first').is(':disabled') )
                    {
                        return;
                    }
                    
                    var file = $(this).parent().children(':first').clone(true);
                    file.removeAttr('value');
                    file.removeAttr('title');

                    $(this).prev().prev().text('');
                    $(this).parent().children(':first').replaceWith( file );
                    
                    $(this).hide();
                });
                                
                // Change
                // *************************************************************                
                
                $(this).change(function()
                {
                    var file = $(this).val().replace(/^.*[\/\\]/gi, '').replace(/^[\s\t\n\r]|[\s\t\n\r]+$/g, '');
                    
                    $(this).next().text( file );
                    
                    if( file == '' )
                    {
                        $(this).next().next().next().hide();
                        $(this).removeAttr('title');
                    }
                    else
                    {
                        $(this).next().next().next().show();
                        $(this).attr('title', file);
                    }
                });
                
                // Hover
                // *************************************************************                
                
                $('#jQueryFile' + $(this).attr('id')).hover(
                    function()
                    {
                        if( !$(this).find('input:first').is(':disabled') )
                        {
                            $(this).addClass('file-wrapper-over');
                        }
                    }, 
                    function()
                    {
                        $(this).removeClass('file-wrapper-over');
                    }
                )                
            });          
        },            
               
        clean: function()
        {
            this.each(function()
            {    
                if( !$(this).is(':file') )
                {
                    return;
                }                 
                
                var filePath = $(this).val().replace(/^[\s\t\n\r]|[\s\t\n\r]+$/g, '');

                if( filePath != '' )
                {
                    $(this).next().next().next().hide();
                    $(this).removeAttr('title');
                    
                    var file = $(this).clone(true);
                    file.removeAttr('value');
                    file.removeAttr('title');
                    
                    $(this).next().text('');                   
                    $(this).replaceWith( file );                 
                }
            });
        },                 
               
        enable: function()
        {
            this.each(function()
            {
                if( !$(this).is(':file') )
                {
                    return;
                }                 
                
                $(this).removeAttr('disabled');
                
                if( $(this).val().replace(/^[\s\t\n\r]|[\s\t\n\r]+$/g, '') != '' )
                {
                    $(this).next().next().next().show(); // shows remove button
                }
                
                $(this).parent().removeClass('file-wrapper-disabled');    
            });
        },        
        
        disable: function()
        {
            this.each(function()
            {    
                if( !$(this).is(':file') )
                {
                    return;
                }                 
                
                $(this).attr('disabled', 'disabled');
                $(this).parent().addClass('file-wrapper-disabled');    
            });
        }      
        
    };

    $.fn.file = function( method ) 
    {        
        if( typeof method == 'string' )
        {
            if( methods[method] ) 
            {
                return methods[method].call(this);
            }
            else
            {
                $.error('Method ' + method + ' does not exist on jQuery.file!');
            }
        }
        else
        {
            return methods._init.apply(this, arguments);            
        }
    };

})(jQuery);