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
			<br><h1><b>The Top 10 High Scores</b></h1>
			<?php
				echo "<br>";
				/*create connection*/
				$con=mysqli_connect("127.0.0.1","mark_goodwin@lukescode.net","markg7","billgamehs");
				
				
				/*check connection*/
				if (mysqli_connect_errno($con)){
					echo "Failed to connect to MySQL: " . mysqli_connect_error();
				 } else {
					echo "Connected!";
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
				  echo "</tr>"
				  }
				  
				  echo "<tr>";
				  echo "<td>7243</td>";
				  echo "<td>Bill</td>";
				  echo "<td>11-18-2013</td>";
				  echo "</tr>";
				  
				  echo "<tr>";
				  echo "<td>6452</td>";
				  echo "<td>Gordon</td>";
				  echo "<td>11-20-2013</td>";
				  echo "</tr>";
				  
				  echo "<tr>";
				  echo "<td>5542</td>";
				  echo "<td>Kevin</td>";
				  echo "<td>11-11-2013</td>";
				  echo "</tr>";

				  echo "<tr>";
				  echo "<td>1</td>";
				  echo "<td>Walter</td>";
				  echo "<td>11-10-2013</td>";
				  echo "</tr>";				  
				echo "</table>";
				
				/*close connection*/
				mysqli_close($con);
			?>
			
			<p> &emsp; This is test data as implementation of a scoring system was not completed for the Senior Project Bill Game</p>
		</div>

		<div id="footer">
			Copyright  Bill Game Awesome Guy
		</div>
	</div>
</body>
</html>