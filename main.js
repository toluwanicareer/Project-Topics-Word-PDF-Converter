var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('.show-time')
    update();
    setInterval(update, 1000);
});

$('.pdf_form').submit(function(e){
	e.preventDefault();
	formdata=new FormData()
	var fileSelect = document.getElementById('file-select');
	file=fileSelect.files
	formdata.append('file', file[0], file.name);
	//ajax_it(formdata);
	convert_it(formdata);
	$('.convertbtn').text('Converting ...')
})

function convert_it(formdata){


$.ajax({
    url: 'https://v2.convertapi.com/convert/docx/to/pdf?Secret=OzUJvmJf1jVlhO6Y',
    data: formdata,
    processData: false,
    contentType: false,  
    method: 'POST',
    success: function(data) {
        console.log(data);
       files=data.Files
       file=files[0]
       data=file.FileData;
       let url='data:application/pdf;base64, ' + data;
       $('#sec-download-link').attr('href',url);
       $('#sec-download-link').attr('download', file.FileName )
       $('#sec-download-link').css('display','block');
       //window.open(url,"_blank");
       $('.convertbtn').text('Convert Another File')
       
    }
})
}

$('.doc_form').submit(function(e){
	e.preventDefault();
	formdata=new FormData()
	var fileSelect = document.getElementById('pdf-file-select');
	file=fileSelect.files
	formdata.append('file', file[0], file.name);
	ajax_it(formdata);
	$('.convertbtn').text('Converting ...')
})

function ajax_it(formdata){


$.ajax({
    url: 'https://journals.projecttopics.org/convert',
    data: formdata,
    processData: false,
    contentType: false,  
    method: 'POST',
    success: function(data) {
        console.log(data);
       
       $('#download-link').attr('href',data.data);
       $('#download-link').attr('download', file.FileName )
       $('#download-link').css('display','block');
       //window.open(url,"_blank");
       $('.convertbtn').text('Convert Another File')
       
    }
}).fail(function (jqXHR, textStatus, errorThrown) {

    console.log(errorThrown);
})



}