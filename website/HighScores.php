<!DOCTYPE html>
<html>
<head>
	<title>High Scores</title>
	<link rel="stylesheet" type="text/css" href="style.css"/>
</head>

<body>
	<div id="container">
		<div id="header">
			<h1 id="name">High Scores</h1>
		</div>
		
		<div class="menu">
			<ul id="nav">
				<li><a href="BillGame.html">The Game &#187;</a><br></li>
				<li><a href="HighScores.php"><b>High Scores &#187;</b></a><br></li>
				<li><a href="TheProcess.html">The Process &#187;</a><br></li>
				<li><a href="AboutUs.html">About Us &#187;</b></a></li>
			</ul>
		</div>

		<div class="content">
			<b>Call the PHP server to get the top 20 high scores</b><br>
			<?php
				echo "<br>help";
				/*create connection*/
				$con=mysqli_connect("127.0.0.1","markg7","markg7","billgamehs");
				
				/*check connection*/
				if (mysqli_connect_errno($con)){
					echo "Failed to connect to MySQL: " . mysqli_connect_error();
					}
				
				/*Get High Scores and create table*/
				
				$result = mysqli_query($con,"SELECT * FROM highscore ORDER BY Score DESC"); 

				echo "<table border='1'>
				<tr>
				<th>High Score</th>
				<th>Name</th>
				<th>Date</th>
				</tr>";

				while($row = mysqli_fetch_array($result))
				  {
				  echo "<tr>";
				  echo "<td>" . $row['Score'] . "</td>";
				  echo "<td>" . $row['Name'] . "</td>";
				  echo "<td>" . $row['Date'] . "</td>";
				  echo "</tr>";
				  }
				echo "</table>";
				
				/*close connection*/
				mysqli_close($con);
			?>
		</div>

		<div id="footer">
			Copyright  Bill Game Awesome Guy
		</div>
	</div>
</body>
</html>