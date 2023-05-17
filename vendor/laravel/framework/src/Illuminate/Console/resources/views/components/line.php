<div className="mx-2 mb-1 mt-<?php echo $marginTop ?>">
    <span className="px-1 bg-<?php echo $bgColor ?> text-<?php echo $fgColor ?> uppercase"><?php echo $title ?></span>
    <span className="<?php if ($title) {
        echo 'ml-1';
    } ?>">
        <?php echo htmlspecialchars($content) ?>
    </span>
</div>
