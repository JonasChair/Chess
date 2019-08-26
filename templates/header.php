<header>
    <a href='<?= url('')?>' class = "logo">Chess</a>
    <nav>
        <a href='<?= url('')?>'>Home</a>
        <a href='<?= url('games/')?>'>Games</a>
        <a href='<?= url('history/')?>'>History</a>
        <a href='<?= url('notifications/')?>'>Notifications</a>
        <a href='<?= url('logoff/')?>'><?= isset($_SESSION['username']) ?'Log off' : 'Log in';?></a>
        <?= isset($_SESSION['username']) ? '<a href=' . url('profile/') . '>' . $_SESSION['username'] . '</a>' : ''; ?>
    </nav>
</header>