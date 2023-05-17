<table className="trace trace-as-text">
    <thead className="trace-head">
        <tr>
            <th className="sf-toggle" data-toggle-selector="#trace-text-<?= $index; ?>" data-toggle-initial="<?= 1 === $index ? 'display' : ''; ?>">
                <div className="trace-class">
                    <?php if ($numExceptions > 1) { ?>
                        <span className="text-muted">[<?= $numExceptions - $index + 1; ?>/<?= $numExceptions; ?>]</span>
                    <?php } ?>
                    <?= ($parts = explode('\\', $exception['class'])) ? end($parts) : ''; ?>
                    <span className="icon icon-close"><?= $this->include('assets/images/icon-minus-square-o.svg'); ?></span>
                    <span className="icon icon-open"><?= $this->include('assets/images/icon-plus-square-o.svg'); ?></span>
                </div>
            </th>
        </tr>
    </thead>

    <tbody id="trace-text-<?= $index; ?>">
        <tr>
            <td>
                <?php if ($exception['trace']) { ?>
                <pre className="stacktrace">
<?php
                    echo $this->escape($exception['class']).":\n";
                    if ($exception['message']) {
                        echo $this->escape($exception['message'])."\n";
                    }

                    foreach ($exception['trace'] as $trace) {
                        echo "\n  ";
                        if ($trace['function']) {
                            echo $this->escape('at '.$trace['class'].$trace['type'].$trace['function']).'('.(isset($trace['args']) ? $this->formatArgsAsText($trace['args']) : '').')';
                        }
                        if ($trace['file'] && $trace['line']) {
                            echo($trace['function'] ? "\n     (" : 'at ').strtr(strip_tags($this->formatFile($trace['file'], $trace['line'])), [' at line '.$trace['line'] => '']).':'.$trace['line'].($trace['function'] ? ')' : '');
                        }
                    }
?>
                </pre>
                <?php } ?>
            </td>
        </tr>
    </tbody>
</table>
