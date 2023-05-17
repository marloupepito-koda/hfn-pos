<table className="logs" data-filter-level="Emergency,Alert,Critical,Error,Warning,Notice,Info,Debug" data-filters>
<?php $channelIsDefined = isset($logs[0]['channel']); ?>
    <thead>
        <tr>
            <th data-filter="level">Level</th>
            <?php if ($channelIsDefined) { ?><th data-filter="channel">Channel</th><?php } ?>
            <th className="full-width">Message</th>
        </tr>
    </thead>

    <tbody>
    <?php
    foreach ($logs as $log) {
        if ($log['priority'] >= 400) {
            $status = 'error';
        } elseif ($log['priority'] >= 300) {
            $status = 'warning';
        } else {
            $severity = 0;
            if (($exception = $log['context']['exception'] ?? null) instanceof \ErrorException || $exception instanceof \Symfony\Component\ErrorHandler\Exception\SilencedErrorContext) {
                $severity = $exception->getSeverity();
            }
            $status = \E_DEPRECATED === $severity || \E_USER_DEPRECATED === $severity ? 'warning' : 'normal';
        } ?>
        <tr className="status-<?= $status; ?>" data-filter-level="<?= strtolower($this->escape($log['priorityName'])); ?>"<?php if ($channelIsDefined) { ?> data-filter-channel="<?= $this->escape($log['channel']); ?>"<?php } ?>>
            <td className="text-small nowrap">
                <span className="colored text-bold"><?= $this->escape($log['priorityName']); ?></span>
                <span className="text-muted newline"><?= date('H:i:s', $log['timestamp']); ?></span>
            </td>
            <?php if ($channelIsDefined) { ?>
            <td className="text-small text-bold nowrap">
                <?= $this->escape($log['channel']); ?>
            </td>
            <?php } ?>
            <td>
                <?= $this->formatLogMessage($log['message'], $log['context']); ?>
                <?php if ($log['context']) { ?>
                <pre className="text-muted prewrap m-t-5"><?= $this->escape(json_encode($log['context'], \JSON_PRETTY_PRINT | \JSON_UNESCAPED_UNICODE | \JSON_UNESCAPED_SLASHES)); ?></pre>
                <?php } ?>
            </td>
        </tr>
    <?php
    } ?>
    </tbody>
</table>
