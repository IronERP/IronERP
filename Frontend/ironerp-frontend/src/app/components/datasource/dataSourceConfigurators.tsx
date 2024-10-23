/*
 * This file is part of IronERP.
 * 
 * IronERP is free software: you can redistribute it and/or modify it under the terms of 
 * the GNU General Public License as published by the Free Software Foundation, either 
 * version 3 of the License, or (at your option) any later version.
 * IronERP is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR 
 * PURPOSE. See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with IronERP. 
 * If not, see <https://www.gnu.org/licenses/>.
 */

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
