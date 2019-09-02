<?php 
    
?>
<header>
    <a href='<?= url('')?>' class = "logo">Chess</a>
    <nav>
        <a href='<?= url('')?>'>Home</a>
        <?= isset($_SESSION['status'])? ($_SESSION['status'] ? '<a href=' . url('games/') . '> Games </a>' : '') : ''; ?>
        <?= isset($_SESSION['status'])? ($_SESSION['status'] ? '<a href=' . url('history/') . '> History </a>' : '') : ''; ?>
        <?= isset($_SESSION['status'])? ($_SESSION['status'] ? '<a href=' . url('notifications/') . '> Notifications </a>' : '') : ''; ?>
        <?= isset($_SESSION['status'])? ($_SESSION['status'] ? '<a href=' . url('api/logoff/') . '> Log off </a>' : '<a href=' . url('') . '> Log in </a>') : '<a href=' . url('') . '> Log in </a>'; ?>
        <?= isset($_SESSION['status'])? ($_SESSION['status'] ? '<a href=' . url('profile/') . '>' . $_SESSION['username'] . '</a>' : '') : ''; ?>
    </nav>
</header>
<?= jsvariables()?>
<script src=<?= url('js/axios.min.js')?>></script>