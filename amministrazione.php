<html>
	<head>

		<title>GestionaleClj</title>
		<link rel="icon" href="img/logo3.svg" />
		<meta name="viewport" content="width=device-width, user-scalable=no,
	initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<!-- Compiled and minified CSS -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/css/materialize.min.css">
	    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="css/style.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<!-- Compiled and minified JavaScript -->
		<script src="js/sha512.js" type="text/javascript"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/js/materialize.min.js"></script>
		<script src="js/loginAdmin.js" type="text/javascript"></script>

	</head>
	<body>
		<div class="login_form col s12 m6 l4" >
			<h4 style="margin-bottom: 10%;">Pannello di amministrazione</h4>
			<form name="form_login" >
				
				<div class="input-field col s12 m12 l12">
			          <i class="material-icons prefix">account_circle</i>
			          <input type="text" name="user" id="username" class="validate">
			          <label for="usern ">Username</label>
			     </div>
			     <div class="input-field col s12 m12 l12">
			          <i class="material-icons prefix">vpn_key</i>
			          <input type="password" name="password" id="password" class="validate">
			          <label for="password ">Password</label>
			     </div>
			     <div class="input-field col s12 m12 l12" style="text-align: right;margin-bottom: 2%;">
				        <button class="btn waves-effect waves-light  white-text" type="button" id="btn" >Login
						</button>
						<button class="btn waves-effect waves-light white-text" type="reset" name="clear">Reset
						</button>
			      </div>
			</form>
		</div>
		<div class="section dati col s12 m12 l12" >
			<table class="section col s12 m12 l12 responsive-table highlight">
		        <thead>
		          	<tr>
		              	<th data-field="rs">Ragione Sociale</th>
					  	<th data-field="db">Nome DB</th>
					  	<th data-field="nuser">Limite Utenze</th>
					  	<th data-field="nuser">Utenze registrate</th>
					  	<th data-field="sc">Scadenza</th>
		          	</tr>
		        </thead>
		
		        <tbody>
		          			        
		        </tbody>
		    </table>
		</div>
	</body>
</html>

	