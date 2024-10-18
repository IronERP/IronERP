export function RestApiConfigurator() {
    return <>
        <div>
            <div className="field-group">
                <span className="field-label">Datasource Name</span>
                <input type="text" className="field-input"/>
            </div>

            <div className="field-group">
                <span className="field-label">API Endpoint</span>
                <input type="text" className="field-input" placeholder="https://example.com/api/v1/prices/BTCUSDC"/>
            </div>

            <div className="field-group">
                <span className="field-label">HTTP Method</span>
                <select className="field-select">
                    <option selected={true}>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                </select>
            </div>
        </div>
    </>
}

export function PostgresConfigurator() {
    return <>
        configure postgres
    </>
}

export function GrafanaCloudConfigurator() {
    return <>
        configure grafana
    </>
}

export function MsSqlConfigurator() {
    return <>
        configure msql
    </>
}
