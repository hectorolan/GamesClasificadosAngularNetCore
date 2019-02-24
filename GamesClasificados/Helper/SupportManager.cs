using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamesClasificados.Helper
{
    public static class SupportManager
    {
        private const long keyElem1 = 9439;
        private const long keyElem2 = 43;

        internal static long CreateKey(long id)
        {
            return (id * keyElem1) + keyElem2;
        }

        internal static long IdFromHashKey(long key)
        {
            return ((key - keyElem2) / keyElem1);
        }
    }
}
