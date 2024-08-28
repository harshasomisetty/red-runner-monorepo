using UnityEngine;
using DG.Tweening;

public class SplashManager : MonoBehaviour
{
    public RectTransform title;
    public Transform GameShiftTitle, SalvayTitle, LogInPanel;

    public void StartTitle()
    {
        GameShiftTitle.DOLocalMoveX(1000f, 0.8f).SetEase(Ease.OutFlash).SetDelay(0.4f).OnComplete(delegate {
            SalvayTitle.DOLocalMoveX(1000f, 0.8f).SetEase(Ease.OutFlash).OnComplete(delegate
            {
                title.DOAnchorPos(Vector2.zero, 0.8f).OnComplete(delegate {
                    LogInPanel.DOScale(1f, 1).SetEase(Ease.OutBounce);
                });
                title.DOSizeDelta(new Vector2(150f,150f), 0.8f);
            });
        });
    }


    //    title.DOLocalJump(Vector3.zero, 150f, 6, 5, true).OnComplete(delegate
    //        {
    //            title.DOLocalRotate(Vector3.zero, 1, RotateMode.FastBeyond360).SetEase(Ease.OutBounce).OnComplete(delegate
    //            {
    //                titleAnim.enabled = true;
    //                GameShiftTitle.DOLocalMoveX(0, 1).SetEase(Ease.InOutFlash).SetDelay(0.5f).OnComplete(delegate
    //                {
    //                    SalvayTitle.DOLocalMoveX(0, 1).SetEase(Ease.InOutFlash).SetDelay(0.5f).OnComplete(delegate
    //                    {
    //                        titleAnim.enabled = true;
    //                        BG.DOLocalMoveX(2000, 1).SetEase(Ease.InOutFlash).SetDelay(2f).OnStart(delegate
    //                        {

    //                            BG.DOScale(0.8f, 1);

    //                        }).OnComplete(delegate
    //{
    //    LogInPanel.DOScale(1f, 1).SetEase((Ease)Ease.OutBounce);
    //    SplashCanvas.SetActive(false);
    //});
    //                    });
    //                });
    //            });
    //        });
}
