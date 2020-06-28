<?php

    if (isset($_POST["sign-up-username"], $_POST["sign-up-email"], $_POST["sign-up-password"])) {
        $username = $_POST["sign-up-username"];
        $email = $_POST["sign-up-email"];
        $password = $_POST["sign-up-password"];
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        $query = mysqli_query($cnx, "SELECT * FROM users WHERE username = '$username'");
        if (mysqli_num_rows($query) > 0) {
            mysqli_close($cnx);
            echo("User Already Registered");
            exit();
        }
        else {
            mysqli_query($cnx, "INSERT INTO users VALUES('$username', '$email', '$password')");
            mysqli_close($cnx);
            echo "User Registered Successfully";
            exit();
        }
    }

    if (isset($_POST["log-in-username"], $_POST["log-in-password"])) {
        $username = $_POST["log-in-username"];
        $password = $_POST["log-in-password"];
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        $query = mysqli_query($cnx, "SELECT * FROM users WHERE username = '$username' AND password = '$password'");
        if (mysqli_num_rows($query) > 0) {
            mysqli_close($cnx);
            session_start();
            $_SESSION["username"] = $username;
            echo("Log In Successful");
            exit();
        }
        else {
            mysqli_close($cnx);
            echo "User or Password is Incorrect";
            exit();
        }
    }

    if (isset($_POST["logout"])) {
        session_unset();
        session_destroy();
        exit();
    }

    if (isset($_POST["new-username"])) {
        session_start();
        $oldUsername = $_SESSION["username"];
        $newUsername = $_POST["new-username"];
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        $query = mysqli_query($cnx, "UPDATE users SET username = '$newUsername' WHERE username = '$oldUsername'");
        if (mysqli_affected_rows($cnx) > 0) {
            mysqli_close($cnx);
            $_SESSION["username"] = $newUsername;
            echo "Profile Edited Successfully";
            exit();
        } else {
            mysqli_close($cnx);
            echo "Failed to Edit Profile";
            exit();
        }
    }
    
    if (isset($_POST["new-password"])) {
        session_start();
        $oldUsername = $_SESSION["username"];
        $newPassword = $_POST["new-password"];
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        $query = mysqli_query($cnx, "UPDATE users SET password = '$newPassword' WHERE username = '$oldUsername'");
        if (mysqli_affected_rows($cnx) > 0) {
            mysqli_close($cnx);
            echo "Profile Edited Successfully";
            exit();
        } else {
            mysqli_close($cnx);
            echo "Failed to Edit Profile";
            exit();
        }
    }

    if (isset($_POST["post-title"], $_POST["post-content"])) {
        $title = $_POST["post-title"];
        $content = $_POST["post-content"];
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        mysqli_query($cnx, "INSERT INTO posts VALUES('$title', '$content', 0)");
        mysqli_close($cnx);
        echo "Post Added";
        exit();
    }

    if (isset($_GET["fetch-posts"])) {
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        $query = mysqli_query($cnx, "SELECT * FROM posts");
        class Post {
            public function __construct($title, $content) {
                $this->title = $title;
                $this->content = $content;
            }
        }
        $posts = array();
        while($fetch = mysqli_fetch_assoc($query)) {
            $post = new Post($fetch["title"], $fetch["content"]);
            array_push($posts, $post);
        }
        mysqli_close($cnx);
        echo json_encode($posts);
        exit();
    }

    if (isset($_POST["liked-title"], $_POST["liked-content"])) {
        $title = $_POST["liked-title"];
        $content = $_POST["liked-content"];
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        mysqli_query($cnx, "UPDATE posts SET likes = likes + 1 WHERE title = '$title' AND content = '$content'");
        exit();
    }

    if (isset($_POST["disliked-title"], $_POST["disliked-content"])) {
        $title = $_POST["disliked-title"];
        $content = $_POST["disliked-content"];
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        mysqli_query($cnx, "UPDATE posts SET likes = likes - 1 WHERE title = '$title' AND content = '$content'");
        exit();
    }

    if (isset($_GET["best-posts"])) {
        $cnx = mysqli_connect("localhost", "root", "", "web project");
        $query = mysqli_query($cnx, "SELECT * FROM posts ORDER BY likes DESC");
        class Post {
            public function __construct($title, $content) {
                $this->title = $title;
                $this->content = $content;
            }
        }
        $posts = array();
        while($fetch = mysqli_fetch_assoc($query)) {
            $post = new Post($fetch["title"], $fetch["content"]);
            array_push($posts, $post);
        }
        mysqli_close($cnx);
        echo json_encode($posts);
        exit();
    }

?>