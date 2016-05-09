$(document).ready(function(){
    var socket = io.connect('http://localhost:3000');
    var seenStudents = [];
    var seenSlide = 0;
    var Company = '';
    var Student = '';

    $(window).on('keydown', function(e){
        var string = document.URL;
        if(string == 'http://localhost:3000/'){
            if(e.keyCode === 37 || e.keyCode === 39){
                window.location.href = '/who';
            }
        }
        if(window.location.href.indexOf('login') > -1){
            if(e.keyCode === 37){
                window.location.href = '/who';
            }
        }
        if(window.location.href.indexOf('signup') > -1){
            if(e.keyCode === 37){
                window.location.href = '/login';
            }
        }
        if(window.location.href.indexOf('who') > -1){
            if(e.keyCode === 37){
                window.location.href = '/';
            }
        }
        if(window.location.href.indexOf('company') > -1){
            if(e.keyCode === 37){
                window.location.href = '/who';
            }
        }
        if(window.location.href.indexOf('slides') > -1){
            if(e.keyCode === 39){
                socket.emit('date', {company: Company, student: Student});
                socket.emit('randomize', {});
                $('html, body').animate({
                    scrollTop: $("#2").offset().top
                }, 1000);
                location.hash = "#2";
            }
        }

        if(window.location.href.indexOf('slides') > -1){
            if(e.keyCode === 37){
                socket.emit('randomize', {});
                $('html, body').animate({
                    scrollTop: $("#2").offset().top
                }, 1000);
                location.hash = "#2";
            }
        }

        if(window.location.href.indexOf('slides#2') > -1){
            if (e.keyCode === 40){
                $('html, body').animate({
                    scrollTop: $("#3").offset().top
                }, 1000);
                location.hash = "#3";
            }            
            if(e.keyCode === 38){
                $('html, body').animate({
                    scrollTop: $("#1").offset().top
                }, 1000);
                location.hash = "#1";
            }
        }

        if(window.location.href.indexOf('slides#1') > -1){
            if(e.keyCode === 40){
                $('html, body').animate({
                    scrollTop: $("#2").offset().top
                }, 1000);
                location.hash = "#2";
            }
        }

        if(window.location.href.indexOf('slides#3') > -1){
            if (e.keyCode === 38){
                $('html, body').animate({
                    scrollTop: $("#2").offset().top
                }, 1000);
                location.hash = "#2";
            }
        }

        if(window.location.href.indexOf('nostudent') > -1){
            if(e.keyCode === 39){
                window.location.href = '/who';
            }
        }
    });

    $("#companyFormbtn").on('click', function(e){
        var companyname = $("#company").val();
        localStorage.setItem("Company name" , companyname);
        window.location.href = "/slides#2";
        e.preventDefault();
    });

    socket.on('randomUser', function(randUser){
        seenSlide++;
        var users = randUser.length;

        if(seenSlide <= users){
            var random = Math.floor(Math.random()*users);

            while($.inArray(random, seenStudents) > -1)
            {
                random = Math.floor(Math.random()*users);
            }
            var student = randUser[random];

            seenStudents.push(random);
            $('#workimg1').attr({src: student.pictures[1], alt: student.firstName + ' ' + student.lastName});
            $('#workimg2').attr({src: student.pictures[2], alt: student.firstName + ' ' + student.lastName});
            $('#workimg3').attr({src: student.pictures[3], alt: student.firstName + ' ' + student.lastName});
            $('#slideAvatar').attr({src: student.pictures[0], alt: student.firstName + ' ' + student.lastName});
            $('#slideName').text(student.firstName + ' ' + student.lastName);
            $('#slideTraject').text(student.imdTraject);
            $('#slide-fn').text(student.firstName);
            $('#slide-ln').text(student.lastName);
            $('#slide-imdt').text(student.imdTraject);
            $('#slide-bio').text(student.bio);
            $('#slide-fav').text(student.skill);
            $('#slide-port').text(student.portfolio);

            Company = localStorage.getItem("Company name");
            Student = student.firstName + ' ' + student.lastName;
        } else {
            window.location.href = '/nostudent';
        }
    });

    $("#editFormbtn").on('click', function(e){
        var user = $('#usernameEdit').val();
        var firstname = $('#firstnameEdit').val();
        var lastname = $('#lastnameEdit').val();
        var imdtraject = $('#imdtrajectEdit').val();
        var skill = $('#skillEdit').val();
        var portfolio = $("#portfolioEdit").val();
        var bio = $('#bioEdit').val();
        socket.emit('updateProfile', {user: user, firstname: firstname, lastname: lastname, imdtraject: imdtraject, skill: skill, portfolio: portfolio, bio: bio});
        window.location.href = "http://localhost:3000/user";
        e.preventDefault();
    });

    $('#uploadForm').submit(function() {
        var user = $("#userUpload").val();
        var avatarupload = $("#linkavatar").val();
        var avatar = "/uploads/" + avatarupload.replace('C:\\fakepath\\', '');
        var work1upload = $("#linkwork1").val();
        var work1 = "/uploads/" + work1upload.replace('C:\\fakepath\\', '');
        var work2upload = $("#linkwork2").val();
        var work2 = "/uploads/" + work2upload.replace('C:\\fakepath\\', '');
        var work3upload = $("#linkwork3").val();
        var work3 = "/uploads/" + work3upload.replace('C:\\fakepath\\', '');
        socket.emit('updatePictures', {user : user, avatar: avatar, work1: work1, work2: work2, work3: work3});

        $(this).ajaxSubmit({
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },

            success: function(response) {
                console.log(response);
            }
        });

        return false;
    });

    $('#clearDate').on('click', function(){
        $("#clearedDates").text("All dates have been cleared.");
        socket.emit('deleteDates', {});
    });

    $('#clearUsers').on('click', function(){
        $("#clearedUsers").text("All users, except for admins, have been cleared.");
        socket.emit('deleteUsers', {});
    });

    socket.on('printDate', function(date){
        for(var i = 0; i<date.length; i++){
            $('#date').prepend('<li><p><strong class="red">'+date[i].companyName+'</strong>' + ' wants to date ' +'<strong class="green">'+ date[i].studentName+'!</strong></p></li>');
        }
    });

    socket.on('update', function(date){
        $('#date').prepend('<li><p><strong class="red">'+date.companyName+'</strong>' + ' wants to date ' +'<strong class="green">'+ date.studentName+'!</strong></p></li>');
    });
    
    socket.on('printUserDate', function(data){
        for(var i = 0; i<data.length; i++){
            $('#userdate').prepend('<li><p><strong class="red">'+data[i].companyName+'</strong> wants to date you!</p></li>');
        }
    });

    $(document).on('change', '.btn-file :file', function(){
        var input = $(this);
        var label = input.val().replace(/\\/g,'/').replace(/.*\//,'');

        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label){
        var input = $(this).parents('.input-group').find(':text');
        input.val(label);
    });
});