/**
 * Interactive EU broker comparison — preserves eubrokers table data & styling.
 */
(function () {
    'use strict';

    const INFO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-main-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>`;

    const COLUMNS = [
        { key: 'broker', label: 'Broker', sortable: true, alwaysVisible: true },
        { key: 'info', label: 'Info/Referral', sortable: false, alwaysVisible: true },
        { key: 'maintenance', label: 'Annual Maintenance', sortable: true },
        { key: 'stocksFees', label: 'Stocks Fees', sortable: true, badge: 'fee' },
        { key: 'etfFees', label: 'ETF Fees', sortable: true, badge: 'fee' },
        { key: 'fxFee', label: 'FX Fee', sortable: true, badge: 'fee' },
        { key: 'minDeposit', label: 'Min Deposit', sortable: true, badge: 'fee' },
        { key: 'withdrawal', label: 'Withdrawal', sortable: true, badge: 'fee' },
        { key: 'inactivity', label: 'Inactivity', sortable: true, badge: 'fee' },
        { key: 'securitiesTransfer', label: 'Securities Transfer', sortable: true },
        { key: 'regulator', label: 'Regulator-Structure', sortable: true, badge: 'regulator' },
        { key: 'protection', label: 'Protection', sortable: true, badge: 'protection' },
        { key: 'compare', label: '', sortable: false, alwaysVisible: true },
    ];

    const BROKERS = [
        { id: 'lightyear', name: 'Lightyear', infoUrl: 'https://lightyear.com/en-es/profile/lucas496', infoTooltip: 'UK/EU broker, 0.1% fee for stocks, no ETF fees, low FX, FCA & EFSA regulated.', maintenance: '€0', stocksFees: '€1/0.1%', etfFees: '€0', fxFee: '0.35%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'With fee', regulator: 'FCA/EFSA', protection: '£85k/€20k' },
        { id: 'trading212', name: 'Trading 212', infoUrl: 'https://www.trading212.com/invite/16biYR3VBq', infoTooltip: 'Commission-free stocks/ETFs, pies for auto-invest, low FX, FCA/CySEC regulated.', maintenance: '€0', stocksFees: '€0', etfFees: '€0', fxFee: '0.15%-0.5%', minDeposit: '€1', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'Free', regulator: 'FCA/CySEC/BaFin', protection: '£85k/€20k' },
        { id: 'myinvestor', name: 'MyInvestor', infoUrl: 'https://newapp.myinvestor.es/do/signup?promotionalCode=G9GLY', infoTooltip: 'Spanish neobank, large variaty and no fee on funds, not good for trading (the app is not great yet). No custody or inactivity fees.', maintenance: '€0-€95.88', stocksFees: '1€/0.12%', etfFees: '1€/0.12%', fxFee: '0.5%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'Yes', regulator: 'CNMV (Bank)', protection: '€100k' },
        { id: 'traderepublic', name: 'Trade Republic', infoUrl: 'https://traderepublic.com/en-es/nocodereferral?code=l7rwnx7c', infoTooltip: 'German broker,low transparency in spreads fees, free savings plans, €1 per trade, wide asset selection, BaFin regulated.', maintenance: '€0', stocksFees: '€1', etfFees: '€1', fxFee: '0.5%', minDeposit: '€1', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'With fee', regulator: 'BaFin/CNMV/BCE (Bank)', protection: '€100k' },
        { id: 'xtb', name: 'XTB', infoUrl: 'https://www.xtb.com', infoTooltip: 'Polish broker, commission-free stocks/ETFs, inactivity fee after 12 months above 100K in assets. Holding physical assets like even one stock or ETF share waives the fee entirely.', maintenance: '€0', stocksFees: '€0*', etfFees: '€0*', fxFee: '0.5%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0-€10/mo', securitiesTransfer: 'No', regulator: 'FCA/CySEC/CNMV/KNF (Listed Company "XTB")', protection: '£85k/€20k' },
        { id: 'n26', name: 'N26', infoUrl: 'https://n26.com/r/lucasnim1655', infoTooltip: 'German fintech and mobile bank based in Berlin, Mastercard debit cards, instant money transfers, savings, and free investment options, operating mainly in European countries without physical branches', maintenance: '€0', stocksFees: '€0', etfFees: '€0', fxFee: '0%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'Yes', regulator: 'BaFin/CySEC/MiFID II/FMA/ (Bank)', protection: '€20k' },
        { id: 'etoro', name: 'eToro', infoUrl: 'https://www.etoro.com/', infoTooltip: 'Club membership with benefits, copy trading, zero commission, $5 withdrawal ($0 with some membership), inactivity fee after 12 months.', maintenance: '€0', stocksFees: '€0', etfFees: '€0', fxFee: '0.5%', minDeposit: '€50', withdrawal: '€0 to €5', inactivity: '€10/mo', securitiesTransfer: 'Yes $75 Fee (ACATS)', regulator: 'FCA/CySEC/CNMV (Listed Company "ETOR")', protection: '€20k' },
        { id: 'degiro', name: 'DeGiro', infoUrl: 'https://www.degiro.es/', infoTooltip: 'Dutch broker, low fees, wide market access, no inactivity fee, AFM regulated.', maintenance: '€0', stocksFees: '€1-3', etfFees: '€1', fxFee: '0.25%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'With fee', regulator: 'FCA/AFM/BaFin/CNMV (Listed Company "FTK")', protection: '€100k' },
        { id: 'ibkr', name: 'Interactive Brokers', infoUrl: 'https://www.interactivebrokers.com/es/home.php', infoTooltip: 'Global access, respected and listed company, advanced platform, very low FX fee, wide asset range, FCA/CBI regulated.', maintenance: '€0', stocksFees: '€1', etfFees: '€1', fxFee: '0.002%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'With fee', regulator: 'FCA/CBI (Listed Company "IBKR")', protection: '€20k + insurance' },
        { id: 'revolut', name: 'Revolut', infoUrl: 'https://revolut.com/referral/?referral-code=lucasv5js!MAY2-26-AR-H1&geo-redirect', infoTooltip: 'App-based Bank, free plan has limits, paid plans offer more trades, FX up to 1%, FCA regulated.', maintenance: '€0-€450', stocksFees: '0.25%', etfFees: '0.25%', fxFee: '0.5% to 1%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'With fee', regulator: 'FCA/CNMV/MiFID (Bank)', protection: '€100k' },
        { id: 'scalable', name: 'Scalable Capital', infoUrl: 'https://es.scalable.capital/en/invitation/bfw4z8', infoTooltip: "German broker, low-cost trading, information is from their free plan 'FREE BROKER', savings plan orders are free and some of their ETFs too.", maintenance: '€0-€59.88', stocksFees: '€0.99', etfFees: '€0.99', fxFee: '0.99%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'Yes', regulator: 'FCA/BaFin/AMF/CONSOB/CNMV/FMA (Bank)', protection: '€100k' },
        { id: 'freedom24', name: 'Freedom24', infoUrl: 'https://lp.freedom24.com/', infoTooltip: 'Freedom Holding Corp. is a NASDAQ-listed public company, monthly fee based on filled contracts, varies with activity. Watch out for the fees!', maintenance: '€0', stocksFees: '0.5% +€0.012', etfFees: '0.5% +€0.012', fxFee: '0.01%', minDeposit: '€0', withdrawal: '€7', inactivity: '€0', securitiesTransfer: '€100 per ISIN', regulator: 'CySEC/MiFID/SEC/BaFin (Listed Company "FRHC")', protection: '€20k' },
        { id: 'neverless', name: 'Neverless', infoUrl: 'https://neverless.com/referral?code=lucson', infoTooltip: 'Neverless 1,000+ US stocks. 400+ ETFs. 0 fees. Up to 5x leverage.Deposit EUR, USD, or stablecoins. You earn dividends, and you also earn daily interest on your uninvested balance.', maintenance: '€0', stocksFees: '€0', etfFees: '€0', fxFee: '0.0%', minDeposit: '€0', withdrawal: '€0', inactivity: '€0', securitiesTransfer: 'No', regulator: 'MICA/MiFID II', protection: 'No insurance' },
    ];

    const FILTERS = [
        { id: 'zero-stocks', label: 'Zero stock fees', test: (b) => isZeroFee(b.stocksFees) },
        { id: 'zero-etf', label: 'Zero ETF fees', test: (b) => isZeroFee(b.etfFees) },
        { id: 'bank', label: 'Bank regulated', test: (b) => /\(Bank\)/i.test(b.regulator) },
        { id: 'protection-100k', label: '€100k protection', test: (b) => /100\s*k|100k/i.test(b.protection) },
        { id: 'free-withdrawal', label: 'Free withdrawal', test: (b) => isZeroFee(b.withdrawal) },
        { id: 'no-inactivity', label: 'No inactivity fee', test: (b) => isZeroFee(b.inactivity) },
        { id: 'free-transfer', label: 'Free securities transfer', test: (b) => /^free$/i.test(b.securitiesTransfer.trim()) },
    ];

    const HIGHLIGHTS = [
        { id: 'cheapest-trading', label: 'Lowest trading fees', match: (b) => isZeroFee(b.stocksFees) && isZeroFee(b.etfFees) },
        { id: 'lowest-fx', label: 'Lowest FX fees', match: (b) => parsePercent(b.fxFee) <= 0.15 },
        { id: 'strong-protection', label: 'Strongest protection', match: (b) => protectionScore(b.protection) >= 100 },
    ];

    const state = {
        search: '',
        activeFilters: new Set(),
        activeHighlight: null,
        sortKey: 'broker',
        sortDir: 1,
        hiddenColumns: new Set(),
        compareIds: [],
        showChart: false,
    };

    let table, tbody, compareBar, detailDrawer, compareOffcanvas;

    function parseNumber(str) {
        const m = String(str).match(/[\d.]+/g);
        if (!m || !m.length) return NaN;
        return Math.min(...m.map(Number).filter((n) => !isNaN(n)));
    }

    function parsePercent(str) {
        const n = parseNumber(str);
        return isNaN(n) ? Infinity : n;
    }

    function isZeroFee(str) {
        const s = String(str).toLowerCase();
        if (/no\s|none|n\/a/i.test(s)) return false;
        return /^€?0(\.|$|\s|\/|\*)/.test(s.trim()) || s === '0%' || s === '0.0%' || s === 'free';
    }

    function protectionScore(str) {
        const nums = String(str).match(/[\d.]+/g);
        if (!nums) return 0;
        return Math.max(...nums.map(Number));
    }

    function feeBadgeClass(value) {
        if (isZeroFee(value)) return 'text-bg-success';
        const pct = parsePercent(value);
        const flat = parseNumber(value);
        if ((!isNaN(pct) && pct <= 0.5) || (!isNaN(flat) && flat <= 1)) return 'text-bg-primary';
        if ((!isNaN(pct) && pct <= 1) || (!isNaN(flat) && flat <= 10)) return 'text-bg-warning';
        return 'text-bg-danger';
    }

    function regulatorBadgeClass(value) {
        if (/\(Bank\)/i.test(value)) return 'text-bg-primary';
        if (/Listed Company/i.test(value)) return 'text-bg-info';
        return 'text-bg-secondary';
    }

    function protectionBadgeClass(value) {
        const score = protectionScore(value);
        if (/no insurance/i.test(value)) return 'text-bg-danger';
        if (score >= 100) return 'text-bg-success';
        if (score >= 85) return 'text-bg-primary';
        if (score >= 20) return 'text-bg-warning';
        return 'text-bg-secondary';
    }

    function badgeHtml(value, type) {
        if (!type || type === 'compare') return escapeHtml(value);
        let cls = 'text-bg-secondary';
        if (type === 'fee') cls = feeBadgeClass(value);
        else if (type === 'regulator') cls = regulatorBadgeClass(value);
        else if (type === 'protection') cls = protectionBadgeClass(value);
        return `<span class="badge ${cls} px-2 py-1 rounded-pill fw-normal">${escapeHtml(value)}</span>`;
    }

    function escapeHtml(s) {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function sortValue(broker, key) {
        if (key === 'broker') return broker.name.toLowerCase();
        const raw = broker[key];
        if (raw == null) return '';
        const num = parseNumber(raw);
        const pct = parsePercent(raw);
        if (key === 'fxFee' || String(raw).includes('%')) return isNaN(pct) ? raw : pct;
        if (!isNaN(num) && /[€$0-9]/.test(raw)) return num;
        return String(raw).toLowerCase();
    }

    function filteredBrokers() {
        let list = [...BROKERS];
        const q = state.search.trim().toLowerCase();
        if (q) {
            list = list.filter((b) =>
                Object.values(b).some((v) => String(v).toLowerCase().includes(q))
            );
        }
        FILTERS.forEach((f) => {
            if (state.activeFilters.has(f.id)) list = list.filter(f.test);
        });
        if (state.activeHighlight) {
            const h = HIGHLIGHTS.find((x) => x.id === state.activeHighlight);
            if (h) list = list.filter(h.match);
        }
        list.sort((a, b) => {
            const x = sortValue(a, state.sortKey);
            const y = sortValue(b, state.sortKey);
            if (typeof x === 'number' && typeof y === 'number') return state.sortDir * (x - y);
            return state.sortDir * String(x).localeCompare(String(y), undefined, { numeric: true });
        });
        return list;
    }

    function renderTable() {
        const brokers = filteredBrokers();
        const visibleCols = COLUMNS.filter((c) => c.alwaysVisible || !state.hiddenColumns.has(c.key));

        let head = '<tr>';
        visibleCols.forEach((col) => {
            if (col.key === 'compare') {
                head += '<th scope="col" class="fw-bold text-center" style="width:3rem">Compare</th>';
                return;
            }
            const hidden = state.hiddenColumns.has(col.key) ? ' col-hidden' : '';
            const sortable = col.sortable ? ' sortable' : '';
            const indicator = col.sortable && state.sortKey === col.key
                ? (state.sortDir === 1 ? ' ▲' : ' ▼')
                : '';
            head += `<th scope="col" data-col="${col.key}" class="fw-bold${sortable}${hidden}">${col.label}<span class="sort-indicator">${indicator}</span></th>`;
        });
        head += '</tr>';
        table.querySelector('thead').innerHTML = head;

        tbody.innerHTML = brokers.map((b) => {
            const selected = state.compareIds.includes(b.id);
            let row = `<tr data-broker-id="${b.id}" class="${selected ? 'row-selected' : ''}">`;
            visibleCols.forEach((col) => {
                const hidden = state.hiddenColumns.has(col.key) ? ' col-hidden' : '';
                if (col.key === 'broker') {
                    row += `<td class="${hidden}" data-field="broker"><button type="button" class="btn btn-link p-0 text-body-emphasis fw-semibold text-decoration-none broker-name-btn" data-broker-id="${b.id}">${escapeHtml(b.name)}</button></td>`;
                } else if (col.key === 'info') {
                    row += `<td class="${hidden}" data-field="info"><a href="${escapeHtml(b.infoUrl)}" target="_blank" rel="noopener" data-bs-toggle="tooltip" data-bs-title="${escapeHtml(b.infoTooltip)}">${INFO_ICON}</a></td>`;
                } else if (col.key === 'compare') {
                    const checked = selected ? ' checked' : '';
                    const disabled = !selected && state.compareIds.length >= 3 ? ' disabled' : '';
                    row += `<td class="text-center ${hidden}"><input type="checkbox" class="form-check-input broker-compare-check" data-broker-id="${b.id}"${checked}${disabled} aria-label="Compare ${escapeHtml(b.name)}"></td>`;
                } else {
                    row += `<td class="${hidden}" data-field="${col.key}">${badgeHtml(b[col.key], col.badge)}</td>`;
                }
            });
            row += '</tr>';
            return row;
        }).join('');

        document.getElementById('brokerCompareCount').textContent =
            `${brokers.length} of ${BROKERS.length} brokers`;

        bindTableEvents();
        reinitTooltips();
        renderFeeChart(brokers);
        updateCompareBar();
    }

    function bindTableEvents() {
        table.querySelectorAll('th.sortable').forEach((th) => {
            th.onclick = () => {
                const key = th.getAttribute('data-col');
                if (state.sortKey === key) state.sortDir *= -1;
                else {
                    state.sortKey = key;
                    state.sortDir = 1;
                }
                renderTable();
            };
        });
        tbody.querySelectorAll('.broker-name-btn').forEach((btn) => {
            btn.onclick = () => openDetail(btn.getAttribute('data-broker-id'));
        });
        tbody.querySelectorAll('.broker-compare-check').forEach((cb) => {
            cb.onchange = () => toggleCompare(cb.getAttribute('data-broker-id'), cb.checked);
        });
    }

    function toggleCompare(id, add) {
        if (add) {
            if (state.compareIds.length >= 3) return;
            if (!state.compareIds.includes(id)) state.compareIds.push(id);
        } else {
            state.compareIds = state.compareIds.filter((x) => x !== id);
        }
        renderTable();
        if (state.compareIds.length >= 2) renderComparePanel();
    }

    function updateCompareBar() {
        const bar = compareBar;
        const n = state.compareIds.length;
        bar.classList.toggle('is-visible', n > 0);
        document.getElementById('compareBarCount').textContent = String(n);
        const openBtn = document.getElementById('openComparePanel');
        openBtn.disabled = n < 2;
    }

    function openDetail(id) {
        const b = BROKERS.find((x) => x.id === id);
        if (!b) return;
        document.getElementById('brokerDetailTitle').textContent = b.name;
        const body = document.getElementById('brokerDetailBody');
        const metrics = COLUMNS.filter((c) => c.key !== 'broker' && c.key !== 'info' && c.key !== 'compare');
        body.innerHTML = `
            <p class="text-body-secondary">${escapeHtml(b.infoTooltip)}</p>
            <hr class="opacity-10">
            <dl class="row mb-0">
                ${metrics.map((m) => `
                    <dt class="col-sm-5 text-body-secondary">${m.label}</dt>
                    <dd class="col-sm-7">${badgeHtml(b[m.key], m.badge)}</dd>
                `).join('')}
            </dl>
            <a href="${escapeHtml(b.infoUrl)}" target="_blank" rel="noopener" class="btn btn-primary text-white w-100 mt-4">Visit broker</a>
        `;
        reinitTooltips();
        bootstrap.Offcanvas.getOrCreateInstance(detailDrawer).show();
    }

    function renderComparePanel() {
        const slots = document.getElementById('compareSlots');
        const metrics = document.getElementById('compareMetrics');
        const selected = state.compareIds.map((id) => BROKERS.find((b) => b.id === id)).filter(Boolean);

        slots.innerHTML = [0, 1, 2].map((i) => {
            const b = selected[i];
            if (!b) {
                return `<div class="broker-compare-slot flex-grow-1 d-flex align-items-center justify-content-center text-body-secondary small p-3">Slot ${i + 1}</div>`;
            }
            return `<div class="broker-compare-slot filled flex-grow-1 p-3">
                <div class="d-flex justify-content-between align-items-start">
                    <strong>${escapeHtml(b.name)}</strong>
                    <button type="button" class="btn-close btn-sm" data-remove-compare="${b.id}" aria-label="Remove"></button>
                </div>
                <div class="small text-body-secondary mt-1">${badgeHtml(b.stocksFees, 'fee')} ${badgeHtml(b.protection, 'protection')}</div>
            </div>`;
        }).join('');

        slots.querySelectorAll('[data-remove-compare]').forEach((btn) => {
            btn.onclick = () => toggleCompare(btn.getAttribute('data-remove-compare'), false);
        });

        const compareKeys = ['maintenance', 'stocksFees', 'etfFees', 'fxFee', 'minDeposit', 'withdrawal', 'inactivity', 'protection'];
        metrics.innerHTML = compareKeys.map((key) => {
            const col = COLUMNS.find((c) => c.key === key);
            const values = selected.map((b) => b[key]);
            const nums = values.map((v) => (key === 'fxFee' ? parsePercent(v) : parseNumber(v)));
            const bestIdx = nums.every((n) => !isNaN(n))
                ? nums.indexOf(Math.min(...nums.filter((n) => !isNaN(n))))
                : -1;
            return `<tr>
                <th class="text-body-secondary fw-normal">${col.label}</th>
                ${selected.map((b, i) => {
                    const diff = i === bestIdx && selected.length > 1 ? ' <span class="broker-compare-metric-diff">best</span>' : '';
                    return `<td>${badgeHtml(b[key], col.badge)}${diff}</td>`;
                }).join('')}
            </tr>`;
        }).join('');
    }

    function renderFeeChart(brokers) {
        const panel = document.getElementById('feeChartPanel');
        if (!state.showChart) {
            panel.classList.add('d-none');
            return;
        }
        panel.classList.remove('d-none');
        const chart = document.getElementById('feeChartBars');
        const top = [...brokers]
            .map((b) => ({ name: b.name, fx: parsePercent(b.fxFee) }))
            .filter((x) => !isNaN(x.fx) && x.fx < Infinity)
            .sort((a, b) => a.fx - b.fx)
            .slice(0, 8);
        const max = Math.max(...top.map((x) => x.fx), 0.01);
        chart.innerHTML = top.map((x) => {
            const w = Math.max(4, (x.fx / max) * 100);
            return `<div class="d-flex align-items-center gap-2 mb-2">
                <span class="broker-fee-bar-label text-truncate">${escapeHtml(x.name)}</span>
                <div class="flex-grow-1 bg-body-secondary rounded" style="height:1.25rem">
                    <div class="broker-fee-bar" style="width:${w}%" title="${x.fx}%"></div>
                </div>
                <span class="small text-body-secondary">${x.fx}%</span>
            </div>`;
        }).join('');
    }

    function reinitTooltips() {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
            const inst = bootstrap.Tooltip.getInstance(el);
            if (inst) inst.dispose();
            new bootstrap.Tooltip(el);
        });
    }

    function buildColumnMenu() {
        const menu = document.getElementById('columnToggleMenu');
        menu.innerHTML = COLUMNS.filter((c) => !c.alwaysVisible && c.key !== 'compare').map((col) => {
            const checked = !state.hiddenColumns.has(col.key) ? ' checked' : '';
            return `<li><label class="dropdown-item d-flex align-items-center gap-2 cursor-pointer mb-0">
                <input type="checkbox" class="form-check-input m-0 column-toggle" data-col="${col.key}"${checked}>
                ${col.label}
            </label></li>`;
        }).join('');
        menu.querySelectorAll('.column-toggle').forEach((cb) => {
            cb.onchange = () => {
                if (cb.checked) state.hiddenColumns.delete(cb.getAttribute('data-col'));
                else state.hiddenColumns.add(cb.getAttribute('data-col'));
                renderTable();
            };
        });
    }

    function init() {
        table = document.getElementById('dynamicTable');
        tbody = table.querySelector('tbody');
        compareBar = document.getElementById('brokerCompareBar');
        detailDrawer = document.getElementById('brokerDetailDrawer');
        compareOffcanvas = document.getElementById('brokerCompareOffcanvas');

        document.getElementById('dynamicTableSearch').addEventListener('input', (e) => {
            state.search = e.target.value;
            renderTable();
        });

        document.querySelectorAll('.broker-compare-chip').forEach((chip) => {
            chip.addEventListener('click', () => {
                const id = chip.getAttribute('data-filter');
                if (state.activeFilters.has(id)) state.activeFilters.delete(id);
                else state.activeFilters.add(id);
                chip.classList.toggle('active', state.activeFilters.has(id));
                renderTable();
            });
        });

        document.querySelectorAll('.broker-compare-highlight').forEach((btn) => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-highlight');
                if (state.activeHighlight === id) {
                    state.activeHighlight = null;
                    btn.classList.remove('active');
                } else {
                    document.querySelectorAll('.broker-compare-highlight').forEach((b) => b.classList.remove('active'));
                    state.activeHighlight = id;
                    btn.classList.add('active');
                }
                renderTable();
            });
        });

        document.getElementById('toggleFeeChart').addEventListener('click', () => {
            state.showChart = !state.showChart;
            document.getElementById('toggleFeeChart').classList.toggle('active', state.showChart);
            renderTable();
        });

        document.getElementById('openComparePanel').addEventListener('click', () => {
            renderComparePanel();
            bootstrap.Offcanvas.getOrCreateInstance(compareOffcanvas).show();
        });

        document.getElementById('clearCompare').addEventListener('click', () => {
            state.compareIds = [];
            renderTable();
        });

        buildColumnMenu();
        renderTable();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
