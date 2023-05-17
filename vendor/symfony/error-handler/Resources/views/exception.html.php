<div className="exception-summary <?= !$exceptionMessage ? 'exception-without-message' : ''; ?>">
    <div className="exception-metadata">
        <div className="container">
            <h2 className="exception-hierarchy">
                <?php foreach (array_reverse($exception->getAllPrevious(), true) as $index => $previousException) { ?>
                    <a href="#trace-box-<?= $index + 2; ?>"><?= $this->abbrClass($previousException->getClass()); ?></a>
                    <span className="icon"><?= $this->include('assets/images/chevron-right.svg'); ?></span>
                <?php } ?>
                <a href="#trace-box-1"><?= $this->abbrClass($exception->getClass()); ?></a>
            </h2>
            <h2 className="exception-http">
                HTTP <?= $statusCode; ?> <small><?= $statusText; ?></small>
            </h2>
        </div>
    </div>

    <div className="exception-message-wrapper">
        <div className="container">
            <h1 className="break-long-words exception-message<?= mb_strlen($exceptionMessage) > 180 ? ' long' : ''; ?>"><?= $this->formatFileFromText(nl2br($exceptionMessage)); ?></h1>

            <div className="exception-illustration hidden-xs-down">
                <?= $this->include('assets/images/symfony-ghost.svg.php'); ?>
            </div>
        </div>
    </div>
</div>

<div className="container">
    <div className="sf-tabs">
        <div className="tab">
            <?php
            $exceptionAsArray = $exception->toArray();
            $exceptionWithUserCode = [];
            $exceptionAsArrayCount = count($exceptionAsArray);
            $last = $exceptionAsArrayCount - 1;
            foreach ($exceptionAsArray as $i => $e) {
                foreach ($e['trace'] as $trace) {
                    if ($trace['file'] && false === mb_strpos($trace['file'], '/vendor/') && false === mb_strpos($trace['file'], '/var/cache/') && $i < $last) {
                        $exceptionWithUserCode[] = $i;
                    }
                }
            }
            ?>
            <h3 className="tab-title">
                <?php if ($exceptionAsArrayCount > 1) { ?>
                    Exceptions <span className="badge"><?= $exceptionAsArrayCount; ?></span>
                <?php } else { ?>
                    Exception
                <?php } ?>
            </h3>

            <div className="tab-content">
                <?php
                foreach ($exceptionAsArray as $i => $e) {
                    echo $this->include('views/traces.html.php', [
                        'exception' => $e,
                        'index' => $i + 1,
                        'expand' => in_array($i, $exceptionWithUserCode, true) || ([] === $exceptionWithUserCode && 0 === $i),
                    ]);
                }
                ?>
            </div>
        </div>

        <?php if ($logger) { ?>
        <div className="tab <?= !$logger->getLogs() ? 'disabled' : ''; ?>">
            <h3 className="tab-title">
                Logs
                <?php if ($logger->countErrors()) { ?><span className="badge status-error"><?= $logger->countErrors(); ?></span><?php } ?>
            </h3>

            <div className="tab-content">
                <?php if ($logger->getLogs()) { ?>
                    <?= $this->include('views/logs.html.php', ['logs' => $logger->getLogs()]); ?>
                <?php } else { ?>
                    <div className="empty">
                        <p>No log messages</p>
                    </div>
                <?php } ?>
            </div>
        </div>
        <?php } ?>

        <div className="tab">
            <h3 className="tab-title">
                <?php if ($exceptionAsArrayCount > 1) { ?>
                    Stack Traces <span className="badge"><?= $exceptionAsArrayCount; ?></span>
                <?php } else { ?>
                    Stack Trace
                <?php } ?>
            </h3>

            <div className="tab-content">
                <?php
                foreach ($exceptionAsArray as $i => $e) {
                    echo $this->include('views/traces_text.html.php', [
                        'exception' => $e,
                        'index' => $i + 1,
                        'numExceptions' => $exceptionAsArrayCount,
                    ]);
                }
                ?>
            </div>
        </div>

        <?php if ($currentContent) { ?>
        <div className="tab">
            <h3 className="tab-title">Output content</h3>

            <div className="tab-content">
                <?= $currentContent; ?>
            </div>
        </div>
        <?php } ?>
    </div>
</div>
