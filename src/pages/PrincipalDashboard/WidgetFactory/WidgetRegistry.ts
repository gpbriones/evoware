// WidgetRegistry.ts

import FinanzasWidget from "../WidgetFactory/FinanzasWidget";
import DispositivosWidget from "../WidgetFactory/DispositivosWidget";

const WidgetRegistry = {
    finanzas: {
        title: "Finanzas",
        component: FinanzasWidget,
    },
    dispositivos: {
        title: "Dispositivos",
        component: DispositivosWidget,
    },
};

export default WidgetRegistry;