/* eslint-disable */
(function () {
    var spaceId;
    if (document.currentScript) {
        spaceId = document.currentScript.dataset ? document.currentScript.dataset.spaceId : document.currentScript.getAttribute('data-space-id');
    }

    var s = document.createElement('script');
    s.src = '//unpkg.com/issue-reporter-web@0';
    s.async = 'async';
    s.defer = 'defer';
    s.onload = function () {
        if (window.IssueReporterWeb) {
            var div = document.createElement('div');
            document.body.appendChild(div);
            var issueReporter = window._issueReporter = window.IssueReporterWeb(div, {
                language: 'zh-cn'
            });
            if (spaceId) {
                issueReporter.call('assignEnvInfo', [
                    {
                        spaceId: spaceId,
                        $openUrl: 'http://newicafe.baidu.com/issues/space/' + spaceId
                    }
                ]);
            }
        }

    };

    var lk = document.createElement('link');
    lk.rel = 'stylesheet';
    // lk.href = '//unpkg.com/issue-reporter-web@0/dist/style.css';
    lk.href = '../extra/issue-reporter.css';

    (document.head || document.getElementsByTagName('head')[0]).appendChild(s);
    (document.head || document.getElementsByTagName('head')[0]).appendChild(lk);
})();
