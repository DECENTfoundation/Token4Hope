function injectBuildNumber(buildNumber) {
    var buildNumberStr = JSON.stringify(buildNumber);

    if (buildNumberStr) {
        return `<script type="text/javascript">
            function renderBuildNumber() {
                var buildNumberNode = document.createElement('span');
                buildNumberNode.textContent = ${buildNumberStr};
                document.body.appendChild(buildNumberNode);

                var buildNumberNodeStyle = buildNumberNode.style;
                buildNumberNodeStyle.position = "fixed";
                buildNumberNodeStyle.bottom = 0;
                buildNumberNodeStyle.right = 0;
                buildNumberNodeStyle.display = "inline-block";
                buildNumberNodeStyle.padding = "12px";
                buildNumberNodeStyle.backgroundColor = "rgba(0, 0, 0, 0.1)";
                buildNumberNodeStyle.color = "white";
            };

            document.addEventListener("DOMContentLoaded", renderBuildNumber);
        </script>`;
    }

    return '';
}

module.exports = {
    injectBuildNumber,
}
