<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>J-debruin.nl &#127850;</title>
    <meta property="og:site_name" content="j-debruin.nl">
    <meta property="og:url" content="https://j-debruin.nl">
    <meta property="og:title" content="j-debruin.nl &#127850;">
    <meta property="og:description" content="Deze site is gemaakt door Jorden de Bruin. \r\n Hier probeer ik wat dingen op uit.">
    <meta name="author" content="Jorden de Bruin">
    <link rel="icon" content="&#127850;" />
    <link rel="stylesheet" type="text/css" href="css/style.css?v=1">
    <?php
    $projects = $files = scandir("$_SERVER[DOCUMENT_ROOT]/projects/", 1);
    ?>
</head>
<body>
    <header>
        <div class="banner">
            <h1>J-debruin</h1>
        </div>
    </header>
    <nav class="neon-border-blue">
        <ul class="navList">
            <li class="navItem">
                <a href="/">home</a>
            </li>
            <li class="navItem">
                <a>Projecten</a>
                <ul>
                    <?php foreach ($projects as $project) : ?>
                        <?php if (strlen($project) > 2) : ?>
                            <li><a href="/projects/<?= $project ?>"><?= $project ?></a></li>
                        <?php endif ?>
                    <?php endforeach ?>
                </ul>
            </li>
        </ul>
    </nav>
    <div class="container neon-border">
        <div class="row">
            <?php foreach ($projects as $project) : ?>
                <?php if (strlen($project) > 2) : ?>
                    <a class="item" href="/projects/<?= $project ?>">
                        <h1><?= $project ?></h1>
                        <img src="/projects/<?= $project ?>/icon.png">
                    </a>
                <?php endif ?>
            <?php endforeach ?>
        </div>

    </div>
    <canvas id="background"></canvas>
    <script type="module" src="fireworks/fireworks.js"></script>
</body>

</html>