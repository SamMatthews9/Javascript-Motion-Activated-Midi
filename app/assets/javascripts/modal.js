function modalReady() {
	 
	generateLogin();
  generateRegistration();

	modal1 = ($(document.body)).find('.logInModal');
	modal2 = ($(document.body)).find('.registerModal');
	modal3 = ($(document.body)).find('.userViewModal');
	modal4 = ($(document.body)).find('.saveSongModal');
	$('.modals').on('click', '.songObject h2', activateSavedSong)
	$('.modals').on('click', '#delete', delete_song);

	
	logInForm = $('.logIn');
	logInForm.hide();

	registerForm = $('.register');
	registerForm.hide();

	userView = $('.userView');
	userView.hide();

	saveSong = $('.saveSongForm');
	saveSong.hide();

	menuShow = false; // set global var to prevent re-hiding menu on mouseover event
	menu = $('.menuDiv');
	$('.menuDiv').css({'height': '0', 'opacity': '0' });
}

function showMenu() {
	if (menuShow === false){
		menu.hide();
		$('.menuDiv').css({ 'height': 'auto', 'opacity': '1' });
		menu.slideDown('700', "swing");
		menuShow = true;
	} 	
}

function showLogIn() {
	hideModal2();
	hideModal3();
	hideModal4();
	modal1.empty();
	logInForm.show();
	modal1.append(logInForm);
	modal1.show();
	$('.modals').css({ 'z-index': '5', 'opacity': '1' });
}

function showRegister() {
	console.log(this)
	hideModal1();
	hideModal3();
	hideModal4();
 	modal2.empty();
 	registerForm.show();
 	modal2.append(registerForm);
 	modal2.show();
	$('.modals').css({ 'z-index': '3', 'opacity': '1' });
}

function showUserView() {
	console.log("hi")
	hideModal1();
	hideModal2();
	hideModal4();
 	modal3.empty();
 	modal3.append(userView);
 	userView.show();
 	modal3.show();
	$('.modals').css({ 'z-index': '3', 'opacity': '1' });
}

function showSaveSongForm(){
	console.log('showing save song form')
	hideModal1();
	hideModal2();
	hideModal3();
	modal4.empty();
	modal4.append(saveSong);
	saveSong.show();
	modal4.show();
	$('.modals').css({ 'z-index': '5', 'opacity': '1' })
}

function hideModal1() {
	modal1.hide();
	$('.logInModal').css({ 'z-index': '3', 'opacity': '0' });
}


function hideModal2() {
	modal2.hide();
	$('.registerModal').css({ 'z-index': '3', 'opacity': '0' });
}

function hideModal3() {
	modal3.hide();
	$('.registerModal').css({ 'z-index': '3', 'opacity': '0' });
}

function hideModal4() {
	modal4.hide();
	$('.saveSongModal').css({ 'z-index': '3', 'opacity': '0' });
}

function hideModals() {
	var logInDiv = $('.logIn').css('height', '250px');
	var logInDiv = $('.register').css('height', '330px');
	modal1.hide();
	modal2.hide();
	modal3.hide();
	modal4.hide();
	$('.modals').css({ 'z-index': '3', 'opacity': '0' });
}

function generateLogin(){
	var logInDiv = $('.logIn').css('height', '250px');
	
	var exit = $('<i>').addClass('fa fa-times-circle').attr('id', 'exit');


	var nameLabel = $("<label>").text('username:');	
	var userName = $('<input>').attr('id', 'username')
														 .attr('type', 'text');
	var password = $('<input>').attr('id', 'password')
														 .attr('type', 'password')
	var signIn = $('<button>').attr('id', 'signIn')
														.text('sign in');
	var pwLabel = $("<label>").text('password:');		
	
	password.appendTo(pwLabel);
	userName.appendTo(nameLabel);

	logInDiv.append(nameLabel)
					.append(pwLabel)
					.append(signIn)
					.prepend(exit);
}


function generateRegistration() {
	var regDiv = $('.register')

	var exit = $('<i>').addClass('fa fa-times-circle').attr('id', 'exit');

	var nameLabel = $("<label>").text('username:');	

	var regName = $('<input>').attr('id', 'regName')
														.attr('type', 'text');

	var pwLabel = $("<label>").text('password:');

	var regPW = $('<input>').attr('id', 'regPW')
													.attr('type', 'password');

	var pwConLabel = $("<label>").text('password confirmation:');													

	var regPWcon = $('<input>').attr('id', 'regPWcon')
														 .attr('type', 'password')

	var register = $('<button>').attr('id', 'register')
														  .text('register');	
	regPW.appendTo(pwLabel);	
	regPWcon.appendTo(pwConLabel);												  
	regName.appendTo(nameLabel)

	regDiv.append(nameLabel)
				.append(pwLabel)
				.append(pwConLabel)
				.append(register)
				.prepend(exit);
}

function fetchUserForUserView(){
	console.log("fetching user view data")
	$.get('/get_current_user').done(generateUserView);
};	

function generateUserView(data) {
	console.log(data)
		var userViewDiv = $('.userView');
		$(userViewDiv).empty()

		var exit = $('<i>').addClass('fa fa-times-circle').attr('id', 'exit');

		userViewDiv.prepend(exit);

		var userName = $('<div>').attr('id', 'userName')
															.text(data.current_user.username + "'s songs:");

		userViewDiv.append(userName)													
															
		var songsContainer = $('<div>').addClass('songsContainer');
		

		for (var i = 0; i < data.songs.length; i++) {
					var delete_song = $('<i>').addClass('fa fa-times').attr('id', 'delete').text(' delete song')
					$('<div>').attr('id', data.songs[i].id)
										.attr('songString', data.songs[i].song_string)
										.html('<h2>' + data.songs[i].title + '</h2>')
										.addClass('songObject')
										.append(delete_song)
										.appendTo(songsContainer);
		userViewDiv.append(songsContainer)
	
	};		
	showUserView();	
};

function fetchUserForSaveSongForm(){
	console.log("fetching current user data")
	$.get('/get_current_user').done(generateSaveForm);
}

function generateSaveForm(data) {
	console.log(data)
	if ($('#songTitle').length === 0) {
		var formDiv = $('.saveSongForm');
		var user = $('<h3>').text("sequence title:")
												.attr('userId', data.current_user.id);
		var exit = $('<i>').addClass('fa fa-times-circle').attr('id', 'exit');
		var songTitle = $('<input>').attr('id', 'songTitle') 
																.attr('type', 'text');

		var submitSong = $('<button>').attr('id', 'submitSong')
																	.text('save song');
														
		formDiv.append(user)
					 .append(songTitle)
					 .append(submitSong)	 
					 .prepend(exit)
	} 															
	showSaveSongForm();			
};

function delete_song(){
	var songId = $(this).closest('.songObject').attr('id');
	$.ajax({ 
      type: "DELETE",
      url: '/songs/' + songId,
      data: { songId: songId},
      success: function (data) {
        fetchUserForUserView()
      },
      error: function(data){
      	fetchUserForUserView()
      }
  });
}





